import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

function EditItemModal({
  isOpen,
  onRequestClose,
  item,
  onSave,
  formFields,
  itemName,
	updateItem,
}) {
  const [formData, setFormData] = useState({});
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (!isOpen) return;

    // Fetch options for dynamic form fields (like parties, districts, etc.)
    const fetchOptions = async () => {
      const fetchedOptions = {};
      for (const field of formFields) {
				if (field.type !== 'select' || !field.fetchOptions) continue;
        const data = await field.fetchOptions();
        fetchedOptions[field.name] = data;
      }
      setOptions(fetchedOptions);
    };

    fetchOptions();
  }, [isOpen, formFields]);

  useEffect(() => {
    if (item) {
      const initialData = {};
      formFields.forEach((field) => {
				if (typeof item[field.name] === 'object') {
					initialData[field.name] = item[field.name]?._id || '';
					return;
				}
        initialData[field.name] = item[field.name] || '';
      });
      setFormData(initialData);
    }
  }, [item, formFields]);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field.name]: value,
    }));
  };

  const handleSave = async () => {
    // Validate the form data based on the passed validation rules
    for (const field of formFields) {
			if (field.required && !formData[field.name]) {
				toast.error(`${field.label} is required.`);
				return;
			}

			if (field.validate && !field.validate(formData[field.name])) {
				toast.error(field.validateError || `${field.label} is invalid.`);
				return;
			}
		}

    try {
      await updateItem(item._id, formData);
      toast.success(`${itemName} updated successfully!`);
      await onSave();
      onRequestClose();
    } catch (error) {
			// eslint-disable-next-line no-console
      console.error(error);
      toast.error(`Failed to update ${itemName}. Please try again.`);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-bold mb-4">Edit {itemName}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              {formFields?.map((field) => (
                <div key={field.name} className="mb-4">
                  <label className="block mb-2">{field.label}:</label>
                  {field.type == 'select' ? (
                    <select
                      value={formData[field.name] || ''}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="select select-bordered w-full"
                    >
                      <option value="">Select {field.label}</option>
                      {options[field.name]?.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type || 'text'}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="input input-bordered w-full"
                    />
                  )}
                </div>
              ))}

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button type="button" className="btn" onClick={onRequestClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

EditItemModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onRequestClose: PropTypes.func.isRequired,
	item: PropTypes.object,
	onSave: PropTypes.func.isRequired,
	formFields: PropTypes.array.isRequired,
	itemName: PropTypes.string.isRequired,
	updateItem: PropTypes.func.isRequired,
};

export default EditItemModal;

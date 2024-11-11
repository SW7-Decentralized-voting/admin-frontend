import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { updateConstituency } from '../../API';

function EditConstituencyModal({
  isOpen,
  onRequestClose,
  constituency,
  onSave,
}) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (constituency) {
      setName(constituency.name);
    }
  }, [constituency]);

  const handleSave = async () => {
    if (name.length < 3 || name.length > 100) {
      toast.error('Constituency name must be between 3 and 100 characters.');
      return;
    }
    try {
      await updateConstituency(constituency._id, {
        name,
      });
      toast.success('Constituency updated successfully!');
      onSave();
      onRequestClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to update constituency. Please try again.');
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-bold mb-4">Edit Constituency</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full mb-4"
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={onRequestClose}
                  className="btn btn-secondary"
                >
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
EditConstituencyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  constituency: PropTypes.object,
};

export default EditConstituencyModal;
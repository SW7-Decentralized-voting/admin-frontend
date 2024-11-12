import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { FaSave } from 'react-icons/fa';

/**
 * Generalized AddItem component for adding different types of entities
 * @param {*} props The properties of the component (see propTypes)
 * @returns {JSX.Element} AddItem component
 */
function AddItem({
	onItemAdded,
	addData,
	itemType,
	fields,
}) {
	const [formData, setFormData] = useState({});
	const [selectOptions, setSelectOptions] = useState({}); // Object to store select options

	// Fetch the options for select fields independently
	useEffect(() => {
		const loadOptions = async () => {
			const options = {};
			for (let i = 0; i < fields.length; i++) {
				const field = fields[i];
				if (field.type === 'select' && field.fetchOptions) {
					// Dynamically fetch the options for each select field
					try {
						const data = await field.fetchOptions();  // Use the corresponding fetch function for this field
						options[field.name] = data;
					} catch (error) {
						// eslint-disable-next-line no-console
						console.error(`Error fetching options for ${field.name}:`, error);
						toast.error(`Failed to load options for ${field.label}.`);
					}
				}
			}
			setSelectOptions(options); // Update state with fetched options
		};

		loadOptions();
	}, [fields]);

	// Handle form field value changes
	const handleInputChange = (e, field) => {
		setFormData({
			...formData,
			[field.name]: e.target.value,
		});
	};

	// Reset all form states
	const resetStates = () => {
		setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
	};

	// Form submission handler
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validation
		for (let field of fields) {
			if (field.required && !formData[field.name]) {
				toast.error(`${field.label} is required.`);
				return;
			}

			if (field.validate && !field.validate(formData[field.name])) {
				toast.error(field.validateError ? field.validateError : `${field.label} is invalid.`);
				return;
			}
		}

		try {
			await addData(formData);
			toast.success(`${itemType} added successfully!`);
			resetStates();
			onItemAdded();
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
			toast.error(`Failed to add ${itemType}. Please try again.`);
		}
	};

	return (
		<div className="card bg-primary text-primary-content w-1/3 h-full">
			<div className="card-body flex flex-col items-center justify-between w-full">
				<div>
					<h2 className="card-title text-center">Add a {itemType}</h2>
					<form onSubmit={handleSubmit} className="w-full space-y-4">
						{fields.map((field) => (
							<div className="form-control" key={field.name}>
								<label htmlFor={field.name} className="label">
									<span className="label-text">{field.label}</span>
								</label>
								{field.type === 'select' ? (
									<select
										className="select select-bordered w-full"
										id={field.name}
										value={formData[field.name] || ''}
										onChange={(e) => handleInputChange(e, field)}
									>
										<option disabled value="">
											Select {field.label}
										</option>
										{selectOptions[field.name]?.map((option) => (
											<option key={option._id} value={option._id}>
												{option.name}
											</option>
										))}
									</select>
								) : (
									<input
										type={field.type || 'text'}
										id={field.name}
										value={formData[field.name] || ''}
										onChange={(e) => handleInputChange(e, field)}
										className="input input-bordered w-full"
									/>
								)}
							</div>
						))}
					</form>
				</div>
				<button type="submit" className="btn btn-secondary w-full">
					<FaSave /> Save
				</button>

			</div>
		</div>
	);
}

AddItem.propTypes = {
	onItemAdded: PropTypes.func.isRequired,
	addData: PropTypes.func.isRequired,    // Function to add the item
	itemType: PropTypes.string.isRequired, // Type of the item (e.g., "Candidate", "Party")
	fields: PropTypes.array.isRequired,    // Array of fields for the form
};

export default AddItem;

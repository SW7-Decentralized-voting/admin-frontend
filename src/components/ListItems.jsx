import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditItemModal from './EditItemModal';
import DeleteItemModal from './DeleteItemModal';

function ListItems({
	items,
	fetchItemsData,
	itemType,
	columns,
	deleteItem,
	fields,
	updateItem,
}) {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const openEditModal = (item) => {
		setSelectedItem(item);
		setIsEditModalOpen(true);
	};

	const closeEditModal = () => {
		setIsEditModalOpen(false);
	};

	const openDeleteModal = (item) => {
		setSelectedItem(item);
		setIsDeleteModalOpen(true);
	};

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false);
	};

	const getDisplayValue = (item, field) => {
		if (typeof item[field.name] === 'object') {
			return item[field.name]?.name;
		}
		return item[field.name];
	};

	return (
		<div className="card bg-primary text-primary-content min-h-80 max-h-full">
			<div className="card-body flex flex-col items-center justify-center overflow-auto">
				<div className="overflow-auto bg-secondary rounded-sm">
					<table className="table table-zebra-zebra">
						<thead>
							<tr>
								{fields.map((field) => (
									<th key={field.name}>{field.label}</th>
								))}
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{items.length === 0 && (
								<tr>
									<td colSpan={fields.length + 2}>No {itemType} found.</td>
								</tr>
							)}
							{items.map((item) => (
								<tr key={item._id}>
									{fields.map((field) => (
										<td key={field.name}>{getDisplayValue(item, field)}</td>
									))}
									<td>
										<button
											className="btn"
											onClick={() => openEditModal(item)}
										>
											<FaEdit />
										</button>
									</td>
									<td>
										<button
											className="btn btn-error"
											onClick={() => openDeleteModal(item)}
										>
											<FaTrash />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<EditItemModal
				isOpen={isEditModalOpen}
				onRequestClose={closeEditModal}
				item={selectedItem}
				onSave={fetchItemsData}
				itemName={itemType}
				formFields={fields}
				updateItem={updateItem}
			/>

			<DeleteItemModal
				isOpen={isDeleteModalOpen}
				onRequestClose={closeDeleteModal}
				item={selectedItem}
				onSave={fetchItemsData}
				deleteItemFunc={deleteItem}
				itemType={itemType}
			/>
		</div>
	);
}

ListItems.propTypes = {
	items: PropTypes.array.isRequired,
	fetchItemsData: PropTypes.func.isRequired,
	itemType: PropTypes.string.isRequired,
	columns: PropTypes.array.isRequired,
	deleteItem: PropTypes.func.isRequired,
	fields: PropTypes.array.isRequired,
	updateItem: PropTypes.func.isRequired,
};

export default ListItems;
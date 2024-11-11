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

	return (
		<div className="card bg-primary text-primary-content min-h-80 max-h-full">
			<div className="card-body flex flex-col items-center justify-center overflow-auto">
				<div className="overflow-auto bg-secondary rounded-sm">
					<table className="table table-zebra-zebra">
						<thead>
							<tr>
								{columns.map((col) => (
									<th key={col}>{col}</th>
								))}
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{items.length === 0 && (
								<tr>
									<td colSpan={columns.length + 2}>No {itemType} found.</td>
								</tr>
							)}
							{items.map((item) => (
								<tr key={item._id}>
									{columns.map((col) => (
										<td key={col}>{item[col]}</td>
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
	items: PropTypes.array.isRequired, // array of items to display
	fetchItemsData: PropTypes.func.isRequired, // function to fetch items data
	itemType: PropTypes.string.isRequired, // type of item (e.g. 'Candidates')
	columns: PropTypes.array.isRequired, // columns to display in the table
};

export default ListItems;
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';

function DeleteItemModal({
  isOpen,
  onRequestClose,
  item,
  onSave,
	itemType,
	deleteItemFunc,
}) {
  const handleDelete = async () => {
    try {
      await deleteItemFunc(item._id);
      toast.success(`${itemType}: ${item.name} was deleted successfully!`);
      onSave();
      onRequestClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error(`Failed to delete ${itemType}. Please try again.`);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
            <p>
              Do you really want to delete <strong>{item?.name}</strong>?
            </p>
            <div className="modal-action">
              <button className="btn btn-warning" onClick={handleDelete}>
                Yes, Delete
              </button>
              <button className="btn" onClick={onRequestClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
DeleteItemModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onRequestClose: PropTypes.func.isRequired,
	item: PropTypes.object,
	onSave: PropTypes.func.isRequired,
	itemType: PropTypes.string.isRequired,
	deleteItemFunc: PropTypes.func.isRequired,
};

export default DeleteItemModal;

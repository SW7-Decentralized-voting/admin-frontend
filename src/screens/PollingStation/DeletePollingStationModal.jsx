import PropTypes from 'prop-types';
import { deletePollingStation } from '../../API';
import { toast } from 'react-hot-toast';

function DeleteConfirmationModal({ isOpen, onRequestClose, station, onSave }) {
  const handleDelete = async () => {
    try {
      await deletePollingStation(station._id);
      toast.success('Polling station deleted successfully!');
      onSave();
      onRequestClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to delete polling station. Please try again.');
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
            <p>Do you really want to delete <strong>{station?.name}</strong>?</p>
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

DeleteConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  station: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }),
  onSave: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;

import { deleteParty } from '../../API';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';

function DeleteConfirmationModal({ isOpen, onRequestClose, party, onSave }) {
  const handleDelete = async () => {
    try {
      await deleteParty(party._id);
      toast.success('Party deleted successfully!');
      onSave();
      onRequestClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to delete party. Please try again.');
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
            <p>Do you really want to delete <strong>{party?.name}</strong>?</p>
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
  party: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;

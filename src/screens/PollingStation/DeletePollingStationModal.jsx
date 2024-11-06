import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { deletePollingStation } from '../../API';
import { toast } from 'react-hot-toast';

Modal.setAppElement('#root');

function DeleteConfirmationModal({ isOpen, onRequestClose, station, onConfirm }) {
  const handleDelete = async () => {
    try {
      await deletePollingStation(station._id);
      toast.success('Polling station deleted successfully!');
      onConfirm(station._id);
      onRequestClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to delete polling station. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Delete Confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to delete the polling station <strong>{station?.name}</strong>?</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
}
DeleteConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  station: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }),
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;

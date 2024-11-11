import { toast } from 'react-hot-toast';
import { deleteNominationDistrict } from '../../API';

import PropTypes from 'prop-types';

function DeleteDistrictModal({ isOpen, onRequestClose, district, onSave }) {
  const handleDelete = async () => {
    try {
      await deleteNominationDistrict(district._id);
      toast.success('District deleted successfully!');
      onSave();
      onRequestClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to delete district. Please try again.');
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
            <p>Do you really want to delete <strong>{district?.name}</strong>?</p>
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

DeleteDistrictModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  district: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default DeleteDistrictModal;
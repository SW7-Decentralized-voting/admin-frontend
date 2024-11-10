import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { updateParty } from '../../API';

function EditPartyModal({ isOpen, onRequestClose, party, onSave }) {
  const [name, setName] = useState('');
  const [list, setList] = useState('');

  useEffect(() => {
    if (party) {
      setName(party.name);
      setList(party.list);
    }
  }, [party]);

  const handleSave = async () => {
    if (name.length < 3 || name.length > 100) {
      toast.error('Party name must be between 3 and 100 characters.');
      return;
    }
    if (!/^[A-ZÆØÅ]$/.test(list)) {
      toast.error('Party must have a list consisting of one uppercase letter.');
      return;
    }
    try {
      await updateParty(party._id, {
        name,
        list,
      });
      toast.success('Party updated successfully!');
      onSave();
      onRequestClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to update party. Please try again.');
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-bold mb-4">Edit Party</h2>
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

              <label className="block mb-2">List:</label>
              <input
                type="text"
                value={list}
                onChange={(e) => setList(e.target.value)}
                className="input input-bordered w-full mb-4"
              />

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
EditPartyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  party: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    list: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
};

export default EditPartyModal;

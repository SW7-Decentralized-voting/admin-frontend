import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { getNominationDistricts, updatePollingStation } from '../../API';

function EditPollingStationModal({ isOpen, onRequestClose, station, onSave }) {
  const [name, setName] = useState('');
  const [nominationDistrict, setNominationDistrict] = useState('');
  const [expectedVoters, setExpectedVoters] = useState(1);
  const [nominationDistricts, setNominationDistricts] = useState([]);

  useEffect(() => {
    if (!isOpen) return;

    getNominationDistricts().then((districts) => {
      if (districts.length > 0) {
        setNominationDistricts(districts);
      }
    });
  }, [isOpen]);

  useEffect(() => {
    if (station) {
      setName(station.name);
      setNominationDistrict(station.nominationDistrict);
      setExpectedVoters(station.expectedVoters);
    }
  }, [station]);

  const handleSave = async () => {
    if (name.length < 3 || name.length > 100) {
      toast.error('Polling station name must be between 3 and 100 characters.');
      return;
    }
    if (!nominationDistrict) {
      toast.error('Polling station must belong to a nomination district.');
      return;
    }
    if (expectedVoters < 1) {
      toast.error('Polling station must have at least one expected voter.');
      return;
    }
    try {
      await updatePollingStation(station._id, {
        name,
        nominationDistrict,
        expectedVoters,
      });
      toast.success('Polling station updated successfully!');
      onSave();
      onRequestClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to update polling station. Please try again.');
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-bold mb-4">Edit Polling Station</h2>
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

              <label className="block mb-2">Nomination District:</label>
              <select
                value={nominationDistrict}
                onChange={(e) => setNominationDistrict(e.target.value)}
                className="select select-bordered w-full mb-4"
              >
                <option value="">Select District</option>
                {nominationDistricts.map((district) => (
                  <option key={district._id} value={district._id}>
                    {district.name}
                  </option>
                ))}
              </select>

              <label className="block mb-2">Expected Voters:</label>
              <input
                type="number"
                min="1"
                value={expectedVoters}
                onChange={(e) => setExpectedVoters(Number(e.target.value))}
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

EditPollingStationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  station: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default EditPollingStationModal;

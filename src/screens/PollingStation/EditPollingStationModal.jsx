import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { getNominationDistricts, updatePollingStation } from '../../API';

Modal.setAppElement('#root');

function EditPollingStationModal({ isOpen, onRequestClose, station, onSave }) {
  const [name, setName] = useState('');
  const [nominationDistrict, setNominationDistrict] = useState('');
  const [expectedVoters, setExpectedVoters] = useState(1);
  const [nominationDistricts, setNominationDistricts] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      getNominationDistricts().then((districts) => {
        if (districts.length > 0) {
          setNominationDistricts(districts);
        }
      });
    }
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
      await updatePollingStation(station._id, { name, nominationDistrict, expectedVoters });
      toast.success('Polling station updated successfully!');
      onSave(station._id, { name, nominationDistrict, expectedVoters });
      onRequestClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to add polling station. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Edit Polling Station">
      <h2>Edit Polling Station</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Nomination District:
          <select value={nominationDistrict} onChange={(e) => setNominationDistrict(e.target.value)}>
            <option value=''> Select District</option>
            {nominationDistricts.map((district) => (
              <option key={district._id} value={district._id}>
                {district.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Expected Voters:
          <input type="number" min="1" value={expectedVoters} onChange={(e) => setExpectedVoters(Number(e.target.value))} />
        </label>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
}
EditPollingStationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  station: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    nominationDistrict: PropTypes.string,
    expectedVoters: PropTypes.number,
  }),
  onSave: PropTypes.func.isRequired,
  nominationDistricts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default EditPollingStationModal;

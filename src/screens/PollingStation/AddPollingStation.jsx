import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addPollingStation, getNominationDistricts } from '../../API';
import { toast } from 'react-hot-toast';

function AddPollingStation({ onPollingStationAdded }) {
  const [name, setName] = useState('');
  const [nominationDistricts, setNominationDistricts] = useState([]);
  const [nominationDistrict, setNominationDistrict] = useState('');
  const [expectedVoters, setExpectedVoters] = useState(1);

  useEffect(() => {
    getNominationDistricts().then((nominationDistricts) => {
      if (nominationDistricts.length > 0) {
        setNominationDistricts(nominationDistricts);
      }
    });
  }, []);

  const resetStates = () => {
    setName('');
    setNominationDistrict('');
    setExpectedVoters(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 3 || name.length > 100) {
      toast.error('Polling station name must be between 3 and 100 characters.');
      return;
    }

    if (nominationDistrict === '') {
      toast.error('Polling station must belong to a nomination district.');
      return;
    }

    if (expectedVoters < 1) {
      toast.error('Polling station must have at least one expected voter.');
      return;
    }

    const pollingStationData = { name, nominationDistrict, expectedVoters };

    try {
      await addPollingStation(pollingStationData);
      toast.success('Polling station added successfully!');
      resetStates();
      onPollingStationAdded();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to add polling station. Please try again.');
    }
  };

  return (
    <div className="polling-stations-list">
      <h2>Add a Polling Station</h2>
      <form onSubmit={handleSubmit} className="poll-form">
        <div className="form-group">
          <label htmlFor="pollingStationName">Polling Station Name:</label>
          <input
            type="text"
            id="pollingStationName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nom-district">Nomination District:</label>
          <select
            id="nom-district"
            value={nominationDistrict}
            onChange={(e) => setNominationDistrict(e.target.value)}
          >
            <option value="">Select Nomination District</option>
            {nominationDistricts.map((district) => (
              <option key={district._id} value={district._id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="expectedVoters">Expected Voter Amount:</label>
          <input
            type="number"
            min="1"
            id="expectedVoters"
            value={expectedVoters}
            onChange={(e) => setExpectedVoters(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          Add Polling Station
        </button>
      </form>
    </div>
  );
}

AddPollingStation.propTypes = {
  onPollingStationAdded: PropTypes.func.isRequired,
};

export default AddPollingStation;

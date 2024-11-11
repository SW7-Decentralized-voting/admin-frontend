import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addPollingStation, getNominationDistricts } from '../../API';
import { toast } from 'react-hot-toast';
import { FaSave } from 'react-icons/fa';

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
    <div className="card bg-primary text-primary-content">
      <div className="card-body flex flex-col items-center justify-center">
        <h2 className="card-title text-center">Add a Polling Station</h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="form-control">
            <label htmlFor="pollingStationName" className="label">
              <span className="label-text">Polling Station Name</span>
            </label>
            <input
              type="text"
              id="pollingStationName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label htmlFor="nom-district" className="label">
              <span className="label-text">Nomination District</span>
            </label>
            <select
              className="select select-bordered w-full"
              id="nom-district"
              value={nominationDistrict}
              onChange={(e) => setNominationDistrict(e.target.value)}
            >
              <option disabled value=''>Select Nomination District</option>
              {nominationDistricts.map((district) => (
                <option key={district._id} value={district._id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label htmlFor="expectedVoters" className="label">
              <span className="label-text">Expected Voters</span>
            </label>
            <input
              type="number"
              min="1"
              id="expectedVoters"
              value={expectedVoters}
              onChange={(e) => setExpectedVoters(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <button type="submit" className="btn btn-secondary w-full">
            <FaSave/> Save
          </button>
        </form>
      </div>
    </div>
  );
}

AddPollingStation.propTypes = {
  onPollingStationAdded: PropTypes.func.isRequired,
};

export default AddPollingStation;

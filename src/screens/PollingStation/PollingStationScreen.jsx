import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPollingStation } from '../../API';
import { toast } from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';
import './PollingStationScreen.css';

function PollingStationScreen() {
  const navigate = useNavigate();
  const [pollingStationName, setPollingStationName] = useState('');
  const [pollingStationList, setPollingStationList] = useState('');
  const [nominationDistrict, setNominationDistrict] = useState('');
  const [expectedVoters, setExpectedVoters] = useState(1);

  const resetStates = () => {
    setPollingStationName('');
    setPollingStationList('');
    setNominationDistrict('');
    setExpectedVoters(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pollingStationName.length < 3 || pollingStationName.length > 100) {
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

    const pollingStationData = { name: pollingStationName, list: pollingStationList };

    try {
      await addPollingStation(pollingStationData);
      toast.success('Polling station added successfully!');
      resetStates();
      navigate('/home');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to add polling station. Please try again.');
    }
  };

  return (
    <div className="poll-container">
      <button className="back-button" onClick={() => navigate('/home')}>
        <FaArrowLeft /> Back
      </button>
      <h1>Add a Polling Station</h1>
      <form onSubmit={handleSubmit} className="poll-form">
        <div className="form-group">
          <label htmlFor="pollingStationName">Polling Station Name:</label>
          <input
            type="text"
            id="pollingStationName"
            value={pollingStationName}
            onChange={(e) => setPollingStationName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pollingStationList">Polling Station List:</label>
          <input 
            type="text"
            id="pollingStationList"
            value={pollingStationList}
            onChange={(e) => setPollingStationList(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expectedVoters">Expected Voter Amount:</label>
          <input
            type="number"
            min="1"
            id="expectedVoters"
            value={expectedVoters}
            onChange={(e) => setExpectedVoters(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Polling Station</button>
      </form>
    </div>
  );
}

export default PollingStationScreen;

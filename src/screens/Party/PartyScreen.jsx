import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addParty } from '../../API/VotingAPI';
import { toast } from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';
import './PartyScreen.css';

function PartyScreen() {
  const navigate = useNavigate();
  const [partyName, setPartyName] = useState('');
  const [partyList, setPartyList] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (partyName.length < 3 || partyName.length > 100) {
      toast.error('Party name must be between 3 and 100 characters.');
      return;
    }
    if (!/^[A-ZÆØÅ]$/.test(partyList)) {
      toast.error('List must be a single uppercase letter.');
      return;
    }

    const partyData = { name: partyName, list: partyList };

    try {
      await addParty(partyData);
      toast.success('Party added successfully!');
      setPartyName('');
      setPartyList('');
      navigate('/home');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to add party. Please try again.');
    }
  };

  return (
    <div className="party-container">
      <button className="back-button" onClick={() => navigate('/home')}>
        <FaArrowLeft /> Back
      </button>
      <h1>Add a Party</h1>
      <form onSubmit={handleSubmit} className="party-form">
        <div className="form-group">
          <label htmlFor="partyName">Party Name:</label>
          <input
            type="text"
            id="partyName"
            value={partyName}
            onChange={(e) => setPartyName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="partyList">Party List:</label>
          <input
            type="text"
            id="partyList"
            value={partyList}
            onChange={(e) => setPartyList(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Party</button>
      </form>
    </div>
  );
}

export default PartyScreen;

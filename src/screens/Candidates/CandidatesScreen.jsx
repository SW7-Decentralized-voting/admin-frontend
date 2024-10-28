import { useEffect, useState } from 'react';
import { getParties } from '../../API/VotingAPI';
import './CandidatesScreen.css';

function CandidatesScreen() {
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [constituency, setConstituency] = useState('');
  const [parties, setParties] = useState([]);

  useEffect(() => {
    getParties().then((fetchedParties) => {
      setParties(fetchedParties);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const candidateData = { name, party, constituency };

    setName('');
    setParty('');
    setConstituency('');
  };

  return (
    <div className="candidates-container">
      <h1>Add a Candidate</h1>
      <form onSubmit={handleSubmit} className="candidate-form">
        <div className="form-group">
          <label htmlFor="name">Candidate Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="party">Party:</label>
          <select
            id="party"
            value={party}
            onChange={(e) => setParty(e.target.value)}
            required
          >
            <option value="">Select Party</option>
            {parties.map((partyObj) => (
              <option key={partyObj._id} value={partyObj.list}>
                {partyObj.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="constituency">Constituency (optional):</label>
          <input
            type="text"
            id="constituency"
            value={constituency}
            onChange={(e) => setConstituency(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Add Candidate</button>
      </form>
    </div>
  );
}

export default CandidatesScreen;

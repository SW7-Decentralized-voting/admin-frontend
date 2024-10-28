import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getParties, addCandidate } from '../../API/VotingAPI';
import { toast } from 'react-hot-toast';
import './CandidatesScreen.css';

function CandidatesScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [constituency, setConstituency] = useState('');
  const [parties, setParties] = useState([]);

  useEffect(() => {
    getParties().then((fetchedParties) => {
      setParties(fetchedParties);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const candidateData = {
      name,
      party,
      nominationDistrict: constituency || '671f650ff49f447b568ab412',
    };

    try {
      await addCandidate(candidateData);
      setName('');
      setParty('');
      setConstituency('');
      toast.success('Candidate added successfully!');
      navigate('/home');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error(err.response?.data?.error || 'An error occurred');
    }
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
              <option key={partyObj._id} value={partyObj._id}>
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

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getParties, getNominationDistricts, addCandidate } from '../../API';
import { toast } from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa'; // Import the arrow icon
import './CandidateScreen.css';

function CandidateScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [nominationDistrict, setNominationDistrict] = useState('');
  const [parties, setParties] = useState([]);
  const [nominationDistricts, setNominationDistricts] = useState([]);

  useEffect(() => {
    getParties().then((fetchedParties) => {
      setParties(fetchedParties);
    });

    getNominationDistricts().then((nominationDistricts) => {
      if (nominationDistricts.length > 0) {
        setNominationDistricts(nominationDistricts);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const candidateData = {
      name,
      party,
      nominationDistrict,
    };

    try {
      await addCandidate(candidateData);
      setName('');
      setParty('');
      setNominationDistrict('');
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
      <button className="back-button" onClick={() => navigate('/home')}>
        <FaArrowLeft /> Back
      </button>

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
          <label htmlFor="nominationDistrict">Nomination District:</label>
          <select
            id="nominationDistrict"
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
        <button type="submit" className="submit-button">Add Candidate</button>
      </form>
    </div>
  );
}

export default CandidateScreen;

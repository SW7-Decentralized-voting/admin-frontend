import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addConstituency } from '../../API/VotingAPI';
import { toast } from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';
import './ConstituencyScreen.css';

function ConstituencyScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const constituencyData = { name };

    try {
      await addConstituency(constituencyData);
      setName('');
      toast.success('Constituency added successfully!');
      navigate('/home');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error(err.response?.data?.error || 'An error occurred while adding the constituency');
    }
  };

  return (
    <div className="constituencies-container">
      <button className="back-button" onClick={() => navigate('/home')}>
        <FaArrowLeft /> Back
      </button>

      <h1>Add a Constituency</h1>
      <form onSubmit={handleSubmit} className="constituency-form">
        <div className="form-group">
          <label htmlFor="name">Constituency Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter constituency name"
          />
        </div>
        <button type="submit" className="submit-button">Add Constituency</button>
      </form>
    </div>
  );
}

export default ConstituencyScreen;

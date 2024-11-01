import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getConstituencies, addNominationDistrict } from '../../API';
import { toast } from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';
import './NominationDistrictScreen.css';

function NominationDistrictScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [constituency, setConstituency] = useState('');
  const [constituencies, setConstituencies] = useState([]);

  useEffect(() => {
    getConstituencies()
      .then((fetchedConstituencies) => {
        setConstituencies(fetchedConstituencies);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        toast.error('Failed to fetch constituencies');
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const districtData = {
      name,
      constituency,
    };

    try {
      await addNominationDistrict(districtData);
      setName('');
      setConstituency('');
      toast.success('Nomination District added successfully!');
      navigate('/home');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="nomination-districts-container">
      <button className="back-button" onClick={() => navigate('/home')}>
        <FaArrowLeft /> Back
      </button>

      <h1>Add a Nomination District</h1>
      <form onSubmit={handleSubmit} className="nomination-district-form">
        <div className="form-group">
          <label htmlFor="name">District Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="constituency">Constituency:</label>
          <select
            id="constituency"
            value={constituency}
            onChange={(e) => setConstituency(e.target.value)}
            required
          >
            <option value="">Select Constituency</option>
            {constituencies.map((constituencyObj) => (
              <option key={constituencyObj._id} value={constituencyObj._id}>
                {constituencyObj.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Add Nomination District</button>
      </form>
    </div>
  );
}

export default NominationDistrictScreen;

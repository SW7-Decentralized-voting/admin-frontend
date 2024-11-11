import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getParties, getNominationDistricts, addCandidate } from '../../API';
import { toast } from 'react-hot-toast';
import { FaSave } from 'react-icons/fa';

function AddCandidate({ onCandidateAdded }) {
  const [name, setName] = useState('');
  const [selectedParty, setSelectedParty] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [parties, setParties] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    getParties().then((parties) => {
      if (parties.length > 0) {
        setParties(parties);
      }
    });

    getNominationDistricts().then((districts) => {
      if (districts.length > 0) {
        setDistricts(districts);
      }
    });
  }, []);

  const resetStates = () => {
    setName('');
    setSelectedParty('');
    setSelectedDistrict('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 3 || name.length > 100) {
      toast.error('Candidate name must be between 3 and 100 characters.');
      return;
    }

    if (!selectedParty) {
      toast.error('Candidate must belong to a party.');
      return;
    }

    if (!selectedDistrict) {
      toast.error('Candidate must belong to a nomination district.');
      return;
    }

    const candidateData = {
      name,
      party: selectedParty,
      nominationDistrict: selectedDistrict,
    };

    try {
      await addCandidate(candidateData);
      toast.success('Candidate added successfully!');
      resetStates();
      onCandidateAdded();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to add candidate. Please try again.');
    }
  };

  return (
    <div className="card bg-primary text-primary-content">
      <div className="card-body flex flex-col items-center justify-center">
        <h2 className="card-title text-center">Add a Candidate</h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="form-control">
            <label htmlFor="name" className="label">
              <span className="label-text">Candidate Name</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label htmlFor="party" className="label">
              <span className="label-text">Party</span>
            </label>
            <select
              className="select select-bordered w-full"
              id="party"
              value={selectedParty}
              onChange={(e) => setSelectedParty(e.target.value)}
            >
              <option disabled value="">
                Select Party
              </option>
              {parties.map((party) => (
                <option key={party._id} value={party._id}>
                  {party.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label htmlFor="nom" className="label">
              <span className="label-text">Nomination District</span>
            </label>
            <select
              className="select select-bordered w-full"
              id="nom"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option disabled value="">
                Select Party
              </option>
              {districts.map((district) => (
                <option key={district._id} value={district._id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-secondary w-full">
            <FaSave /> Save
          </button>
        </form>
      </div>
    </div>
  );
}
AddCandidate.propTypes = {
  onCandidateAdded: PropTypes.func.isRequired,
};

export default AddCandidate;

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getConstituencies, addNominationDistrict } from '../../API';
import { toast } from 'react-hot-toast';
import { FaSave } from 'react-icons/fa';

function AddNominationDistrict({ onDistrictAdded }) {
  const [name, setName] = useState('');
  const [constituency, setConstituency] = useState('');
  const [constituencies, setConstituencies] = useState([]);

  useEffect(() => {
    getConstituencies().then((constituencies) => {
      if (constituencies.length > 0) {
        setConstituencies(constituencies);
      }
    });
  }, []);

  const resetStates = () => {
    setName('');
    setConstituency('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 3 || name.length > 100) {
      toast.error(
        'Nomination district name must be between 3 and 100 characters.'
      );
      return;
    }

    if (constituency === '') {
      toast.error('Nomination district must belong to a constituency.');
      return;
    }

    const nominationDistrictData = { name, constituency };

    try {
      await addNominationDistrict(nominationDistrictData);
      toast.success('Nomination district added successfully!');
      resetStates();
      onDistrictAdded();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to add nomination district. Please try again.');
    }
  };

  return (
    <div className="card bg-primary text-primary-content">
      <div className="card-body flex flex-col items-center justify-center">
        <h2 className="card-title text-center">Add a Nomination District</h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="form-control">
            <label htmlFor="districtName" className="label">
              <span className="label-text">Nomination District Name</span>
            </label>
            <input
              type="text"
              id="districtName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label htmlFor="constituency" className="label">
              <span className="label-text">Constituency</span>
            </label>
            <select
              className="select select-bordered w-full"
              id="constituency"
              value={constituency}
              onChange={(e) => setConstituency(e.target.value)}
            >
              <option disabled value="">
                Select constituency
              </option>
              {constituencies.map((constituency) => (
                <option key={constituency._id} value={constituency._id}>
                  {constituency.name}
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
AddNominationDistrict.propTypes = {
  onDistrictAdded: PropTypes.func.isRequired,
};

export default AddNominationDistrict;

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { addConstituency } from '../../API';
import { FaSave } from 'react-icons/fa';

function AddConstituency({ onConstituencyAdded }) {
  const [name, setName] = useState('');

  const resetStates = () => {
    setName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 3 || name.length > 100) {
      toast.error('Constituency name must be between 3 and 100 characters.');
      return;
    }

    const constituencyData = { name };

    try {
      await addConstituency(constituencyData);
      toast.success('Constituency added successfully!');
      resetStates();
      onConstituencyAdded();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to add constituency. Please try again.');
    }
  };

  return (
    <div className="card bg-primary text-primary-content">
      <div className="card-body flex flex-col items-center justify-center">
        <h2 className="card-title text-center">Add a Constituency</h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="form-control">
            <label htmlFor="name" className="label">
              <span className="label-text">Constituency Name</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-secondary w-full">
            <FaSave/>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

AddConstituency.propTypes = {
  onConstituencyAdded: PropTypes.func.isRequired,
};

export default AddConstituency;

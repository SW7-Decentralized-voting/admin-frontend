import { addParty } from '../../API';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { FaSave } from 'react-icons/fa';

function AddParty({ onPartyAdded }) {
  const [partyName, setPartyName] = useState('');
  const [partyList, setPartyList] = useState('');

  const resetStates = () => {
    setPartyName('');
    setPartyList('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (partyName.length < 3 || partyName.length > 100) {
      toast.error('Party name must be between 3 and 100 characters.');
      return;
    }

    if (!/^[A-ZÆØÅ]$/.test(partyList)) {
      toast.error('Party must be one uppercase letter.');
      return;
    }

    const partyData = { name: partyName, list: partyList };

    try {
      await addParty(partyData);
      toast.success('Party added successfully!');
      resetStates();
      onPartyAdded();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to add party. Please try again.');
    }
  };

  return (
    <div className="card bg-primary text-primary-content">
      <div className="card-body flex flex-col items-center justify-center">
        <h2 className="card-title text-center">Add a Party</h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="form-control">
            <label htmlFor="partyName" className="label">
              <span className="label-text">Party Name</span>
            </label>
            <input
              type="text"
              id="partyName"
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label htmlFor="partyList" className="label">
              <span className="label-text">Party List</span>
            </label>
            <input
              type="text"
              id="partyList"
              value={partyList}
              onChange={(e) => setPartyList(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-secondary w-full">
            <FaSave /> Save
          </button>
        </form>
      </div>
    </div>
  );
}
AddParty.propTypes = {
  onPartyAdded: PropTypes.func.isRequired,
};

export default AddParty;

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getConstituencies, updateNominationDistrict } from '../../API';
import { toast } from 'react-hot-toast';

function EditDistrictModal({ isOpen, onRequestClose, district, onSave }) {
  const [name, setName] = useState('');
  const [constituency, setConstituency] = useState('');
  const [constituencies, setConstituencies] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    getConstituencies().then((constituencies) => {
      if (constituencies.length > 0) {
        setConstituencies(constituencies);
      }
    });
  }, [isOpen]);

  useEffect(() => {
    if (district) {
      setName(district.name);
      setConstituency(district.constituency);
    }
  }, [district]);

  const handleSave = async () => {
    if (name.length < 3 || name.length > 100) {
      toast.error('District name must be between 3 and 100 characters.');
      return;
    }
    if (!constituency) {
      toast.error('District must belong to a constituency.');
      return;
    }
    try {
      await updateNominationDistrict(district._id, { name, constituency });
      toast.success('District updated successfully!');
      onSave(district._id, { name, constituency });
      onRequestClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to update district. Please try again.');
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-bold mb-4">
              Edit Nomination District
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full mb-4"
              />

              <label className="block mb-2">Nomination District:</label>
              <select
                value={constituency}
                onChange={(e) => setConstituency(e.target.value)}
                className="select select-bordered w-full mb-4"
              >
                <option value="">Select Constituency</option>
                {constituencies.map((constit) => (
                  <option key={constit._id} value={constit._id}>
                    {constit.name}
                  </option>
                ))}
              </select>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button type="button" className="btn" onClick={onRequestClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
EditDistrictModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  district: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    constituency: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditDistrictModal;

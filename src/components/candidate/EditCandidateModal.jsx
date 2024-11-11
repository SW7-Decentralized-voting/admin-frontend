import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { getParties, getNominationDistricts, updateCandidate } from '../../API';

function EditCandidateModal({ isOpen, onRequestClose, candidate, onSave }) {
  const [name, setName] = useState('');
  const [selectedParty, setSelectedParty] = useState('');
  const [parties, setParties] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen]);

  useEffect(() => {
    if (candidate) {
      setName(candidate.name);
      setSelectedParty(candidate.party);
      setSelectedDistrict(candidate.district);
    }
  }, [candidate]);

  const handleSave = async () => {
    if (name.length < 3 || name.length > 100) {
      toast.error('Candidate name must be between 3 and 100 characters.');
      return;
    }
    if (!selectedParty) {
      toast.error('Candidate must belong to a party.');
      return;
    }
    if (!selectedDistrict) {
      toast.error('Candidate must belong to a district.');
      return;
    }
    try {
      await updateCandidate(candidate._id, {
        name,
        party: selectedParty,
        district: selectedDistrict,
      });
      toast.success('Candidate updated successfully!');
      onSave();
      onRequestClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to update candidate. Please try again.');
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-bold mb-4">Edit Candidates</h2>
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

              <label className="block mb-2">Party:</label>
              <select
                value={selectedParty}
                onChange={(e) => setSelectedParty(e.target.value)}
                className="select select-bordered w-full mb-4"
              >
                <option value="">Select Party</option>
                {parties.map((party) => (
                  <option key={party._id} value={party._id}>
                    {party.name}
                  </option>
                ))}
              </select>

              <label className="block mb-2">Nomination District:</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="select select-bordered w-full mb-4"
              >
                <option value="">Select Nomination District</option>
                {districts.map((district) => (
                  <option key={district._id} value={district._id}>
                    {district.name}
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

EditCandidateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  candidate: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default EditCandidateModal;

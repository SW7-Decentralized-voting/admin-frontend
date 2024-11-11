import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { getPartyCandidates } from '../../API/';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditCandidateModal from '../../components/candidate/EditCandidateModal';
import DeleteCandidateModal from '../../components/candidate/DeleteCandidateModal';

function ListCandidates({ refresh }) {
  const [candidates, setCandidates] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    fetchCandidates();
  }, [refresh]);

  const openEditModal = (candidate) => {
    setSelectedCandidate(candidate);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (candidate) => {
    setSelectedCandidate(candidate);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const fetchCandidates = async () => {
    try {
      const candidates = await getPartyCandidates();
      setCandidates(candidates);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to fetch candidates.');
    }
  };

  return (
    <div className="card bg-primary text-primary-content min-h-80 max-h-full">
      <div className="card-body flex flex-col items-center justify-center overflow-auto">
        <div className="overflow-auto bg-secondary rounded-sm">
          <table className="table table-zebra-zebra ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Party</th>
                <th>District</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {candidates.length === 0 && (
                <tr>
                  <td colSpan="4">No Candidates found.</td>
                </tr>
              )}
              {candidates.map((candidate) => (
                <tr key={candidate._id}>
                  <td>{candidate.name}</td>
                  <td>{candidate.party}</td>
                  <td>{candidate.nominationDistrict}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => openEditModal(candidate)}
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-error"
                      onClick={() => openDeleteModal(candidate)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditCandidateModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        candidate={selectedCandidate}
        onSave={fetchCandidates}
      />

      <DeleteCandidateModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        candidate={selectedCandidate}
        onSave={fetchCandidates}
      />
    </div>
  );
}
ListCandidates.propTypes = {
  refresh: PropTypes.bool.isRequired,
};

export default ListCandidates;

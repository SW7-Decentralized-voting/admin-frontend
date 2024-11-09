import { getParties } from '../../API';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DeleteConfirmationModal from './DeletePartyModal';
import EditPartyModal from './EditPartyModal';

function ListParties({ refresh }) {
  const [parties, setParties] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedParty, setSelectedParty] = useState(null);

  useEffect(() => {
    fetchParties();
  }, [refresh]);

  const openEditModal = (party) => {
    setSelectedParty(party);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (party) => {
    setSelectedParty(party);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const fetchParties = async () => {
    try {
      const parties = await getParties();
      setParties(parties);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to fetch parties.');
    }
  };

  return (
    <div className="card bg-primary text-primary-content min-h-80 max-h-full overflow-auto">
      <div className="card-body flex flex-col items-center justify-center">
        <div className="overflow-auto bg-secondary rounded-sm">
          <table className="table table-zebra-zebra ">
            <thead>
              <tr>
                <th>Name</th>
                <th>List</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {parties.length === 0 && (
                <tr>
                  <td colSpan="4">No polling stations found.</td>
                </tr>
              )}
              {parties.map((party) => (
                <tr key={party._id}>
                  <td>{party.name}</td>
                  <td>{party.list}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => openEditModal(party)}
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-error"
                      onClick={() => openDeleteModal(party)}
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

      <EditPartyModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        party={selectedParty}
        onSave={fetchParties}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        party={selectedParty}
        onConfirm={fetchParties}
      />
    </div>
  );
}
ListParties.propTypes = {
  refresh: PropTypes.bool.isRequired,
};

export default ListParties;

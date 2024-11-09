import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { getConstituencies} from '../../API';
import DeleteConstituencyModal from './DeleteConstituencyModal';
import EditConstituencyModal from './EditConstituencyModal';
import { FaEdit, FaTrash } from 'react-icons/fa';

function ListConstituencies({ refresh }) {
  const [constituencies, setConstituencies] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedConstituency, setSelectedConstituency] = useState(null);

  useEffect(() => {
    fetchConstituencies();
  }, [refresh]);

  const openEditModal = (constituency) => {
    setSelectedConstituency(constituency);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (constituency) => {
    setSelectedConstituency(constituency);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const fetchConstituencies = async () => {
    try {
      const constituencies = await getConstituencies();
      setConstituencies(constituencies);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to fetch constituencies.');
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
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {constituencies.length === 0 && (
                <tr>
                  <td colSpan="4">No Constituencies found.</td>
                </tr>
              )}
              {constituencies.map((constit) => (
                <tr key={constit._id}>
                  <td>{constit.name}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => openEditModal(constit)}
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-error"
                      onClick={() => openDeleteModal(constit)}
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

      <EditConstituencyModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        constituency={selectedConstituency}
        onSave={fetchConstituencies}
      />

      <DeleteConstituencyModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        constituency={selectedConstituency}
        onSave={fetchConstituencies}
      />
    </div>
  );
}
ListConstituencies.propTypes = {
  refresh: PropTypes.bool.isRequired,
};

export default ListConstituencies;
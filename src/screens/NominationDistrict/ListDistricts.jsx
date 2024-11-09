import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getNominationDistricts, deleteNominationDistrict } from '../../API';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditDistrictModal from './EditDistrictModal';
import DeleteDistrictModal from './DeleteDistrictModal';

function ListDistricts({ refresh }) {
  const [districts, setDistricts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    fetchDistricts();
  }, [refresh]);

  const openEditModal = (district) => {
    setSelectedDistrict(district);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (district) => {
    setSelectedDistrict(district);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const fetchDistricts = async () => {
    try {
      const districts = await getNominationDistricts();
      setDistricts(districts);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to fetch nomination districts.');
    }
  };

  const handleDelete = async (districtId) => {
    try {
      await deleteNominationDistrict(districtId);
      fetchDistricts();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const handleSave = async (districtId, nominationDistrictData) => {
    setDistricts((prevDistricts) =>
      prevDistricts.map((district) =>
        district._id === districtId
          ? { ...district, ...nominationDistrictData }
          : district
      )
    );
  };

  return (
    <div className="card bg-primary text-primary-content min-h-80 max-h-full overflow-auto">
      <div className="card-body flex flex-col items-center justify-center">
        <div className="overflow-auto bg-secondary rounded-sm">
          <table className="table table-zebra-zebra ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Constituency</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {districts.length === 0 && (
                <tr>
                  <td colSpan="4">No Nomination Districts found.</td>
                </tr>
              )}
              {districts.map((district) => (
                <tr key={district._id}>
                  <td>{district.name}</td>
                  <td>{district.constituency}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => openEditModal(district)}
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-error"
                      onClick={() => openDeleteModal(district)}
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

      <EditDistrictModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        district={selectedDistrict}
        onSave={handleSave}
      />

      <DeleteDistrictModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        district={selectedDistrict}
        onConfirm={handleDelete}
      />
    </div>
  );
}
ListDistricts.propTypes = {
  refresh: PropTypes.bool.isRequired,
};

export default ListDistricts;
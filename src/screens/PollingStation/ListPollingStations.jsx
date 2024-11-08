import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPollingStations, deletePollingStation } from '../../API';
import { toast } from 'react-hot-toast';
import EditPollingStationModal from './EditPollingStationModal';
import DeleteConfirmationModal from './DeletePollingStationModal';
import { FaEdit, FaTrash } from 'react-icons/fa';

function ListPollingStations({ refresh }) {
  const [pollingStations, setPollingStations] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);

  useEffect(() => {
    fetchPollingStations();
  }, [refresh]);

  const openEditModal = (station) => {
    setSelectedStation(station);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (station) => {
    setSelectedStation(station);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const fetchPollingStations = async () => {
    try {
      const stations = await getPollingStations();
      setPollingStations(stations);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to fetch polling stations.');
    }
  };

  const handleDelete = async (stationId) => {
    try {
      await deletePollingStation(stationId);
      toast.success('Polling station deleted successfully!');
      fetchPollingStations();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to delete polling station. Please try again.');
    }
  };

  const handleSave = async (stationId, pollingStationData) => {
    setPollingStations((prevStations) =>
      prevStations.map((station) =>
        station._id === stationId
          ? { ...station, ...pollingStationData }
          : station
      )
    );
  };

  return (
    <div className="card bg-primary text-primary-content h-full">
      <div className="card-body flex flex-col items-center justify-center max-h-full">
        <h2 className="card-title text-center">List of Polling Stations</h2>
        <div className='overflow-auto bg-secondary rounded-sm'>
          <table className="table table-zebra-zebra ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Nomination District</th>
                <th>Expected Voters</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pollingStations.length === 0 && (
                <tr>
                  <td colSpan="4">No polling stations found.</td>
                </tr>
              )}
              {pollingStations.map((station) => (
                <tr key={station._id}>
                  <td>{station.name}</td>
                  <td>{station.nominationDistrict}</td>
                  <td>{station.expectedVoters}</td>
                  <td>
                    <button className='btn' onClick={() => openEditModal(station)}>
                      <FaEdit/>
                    </button>
                  </td>
                  <td>
                    <button className='btn btn-error' onClick={() => openDeleteModal(station)}>
                      <FaTrash/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditPollingStationModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        station={selectedStation}
        onSave={handleSave}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        station={selectedStation}
        onConfirm={handleDelete}
      />
    </div>
  );
}
ListPollingStations.propTypes = {
  refresh: PropTypes.bool.isRequired,
};

export default ListPollingStations;

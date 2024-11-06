import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPollingStations, deletePollingStation } from '../../API';
import { toast } from 'react-hot-toast';
import EditPollingStationModal from './EditPollingStationModal';
import DeleteConfirmationModal from './DeletePollingStationModal';

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
        station._id === stationId ? { ...station, ...pollingStationData } : station
      )
    );
  };

  return (
    <div className="polling-stations-list">
      <h2>List of Polling Stations</h2>
      <ul>
        {pollingStations.map((station) => (
          <li key={station._id} className="station-item">
            <span>
              {station.name} - {station.nominationDistrictName} - Expected
              Voters: {station.expectedVoters}
            </span>
            <div className="action-buttons">
              <button onClick={() => openEditModal(station)}>Edit</button>
              <button onClick={() => openDeleteModal(station)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

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

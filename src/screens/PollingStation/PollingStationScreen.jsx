import AddPollingStation from './addPollingStation';
import ListPollingStations from './listPollingStations';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './PollingStationScreen.css';

function PollingStationScreen() {
  const navigate = useNavigate();
  const [refreshList, setRefreshList] = useState(false);

  const handlePollingStationAdded = () => {
    setRefreshList(!refreshList);
  };

  return (
    <div className='poll-container'>
      <button className='back-button' onClick={() => navigate('/home')}>
        <FaArrowLeft /> Back
      </button>
      <h1>Polling Station Management</h1>
      <div className='polling-station-layout'>
        <AddPollingStation onPollingStationAdded={handlePollingStationAdded} />
        <ListPollingStations refresh={refreshList} />
      </div>
    </div>
  );
}

export default PollingStationScreen;

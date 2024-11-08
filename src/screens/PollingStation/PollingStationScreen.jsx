import AddPollingStation from './AddPollingStation';
import ListPollingStations from './ListPollingStations';
import Header from '../Components/Header';
import { useState } from 'react';

function PollingStationScreen() {
  const [refreshList, setRefreshList] = useState(false);

  const handlePollingStationAdded = () => {
    setRefreshList(!refreshList);
  };

  return (
    <div className='flex flex-col w-full h-screen items-center justify-evenly'>
      <Header title='Polling Station Management' />
      <div className='flex flex-row justify-center items-start gap-4 h-4/5'>
        <AddPollingStation onPollingStationAdded={handlePollingStationAdded} />
        <ListPollingStations refresh={refreshList} />
      </div>
    </div>
  );
}

export default PollingStationScreen;

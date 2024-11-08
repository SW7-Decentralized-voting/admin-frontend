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
    <div className='flex flex-col w-screen h-screen align-center justify-center'>
      <Header title='Polling Station' />
      <div className='flex flex-row w-full space-x-4 items-center justify-center'>
        <AddPollingStation onPollingStationAdded={handlePollingStationAdded} />
        <ListPollingStations refresh={refreshList} />
      </div>
    </div>
  );
}

export default PollingStationScreen;

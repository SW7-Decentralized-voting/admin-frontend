import Header from '../../components/misc/Header';
import { useState, useEffect } from 'react';
import { getPollingStations, addPollingStation, deletePollingStation, updatePollingStation, getNominationDistricts } from '../../API';
import ListItems from '../../components/ListItems';
import AddItem from '../../components/AddObject';
import { toast } from 'react-hot-toast';

function PollingStationScreen() {
  const [refreshList, setRefreshList] = useState(false);
  const [pollingStations, setPollingStations] = useState([]);

  const handlePollingStationAdded = () => {
    setRefreshList(!refreshList);
  };

  const fetchPollingStations = async () => {
    try {
      const pollingStations = await getPollingStations(['nominationDistrict']);
      return pollingStations;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to fetch polling stations.');
    }
  };

  useEffect(() => {
    fetchPollingStations().then((pollingStations) => {
      if (pollingStations?.length > 0) {
        setPollingStations(pollingStations);
      }
    });
  }, [refreshList]);

  const fields = [
    { name: 'name', type: 'text', label: 'Name', required: true, validate: (value) => value.length >= 3 && value.length <= 100, validateError: 'Polling station name must be between 3 and 100 characters.' },
    { name: 'nominationDistrict', type: 'select', label: 'Nomination District', fetchOptions: getNominationDistricts, required: true },
    { name: 'expectedVoters', type: 'number', label: 'Expected Voters', required: true, validate: (value) => value > 0, validateError: 'Expected voters must be a positive number.' }
  ];

  return (
    <div className='flex flex-col w-full h-screen items-center justify-evenly'>
      <Header title='Polling Station Management' />
      <div className='flex flex-row justify-center items-start gap-4 h-4/5 w-4/5'>
        <AddItem onItemAdded={handlePollingStationAdded} addData={addPollingStation} itemType='Polling Station' fields={fields} />
        <ListItems
          items={pollingStations}
          fetchItemsData={handlePollingStationAdded}
          itemType='Polling Station'
          fields={fields}
          updateItem={updatePollingStation}
          deleteItem={deletePollingStation}
        />
      </div>
    </div>
  );
}

export default PollingStationScreen;

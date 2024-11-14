import { useState, useEffect } from 'react';
import Header from '../../components/misc/Header';
import AddItem from '../../components/AddObject';
import { addNominationDistrict, getNominationDistricts, getConstituencies, updateNominationDistrict, deleteNominationDistrict } from '../../API';
import ListItems from '../../components/ListItems';
import { toast } from 'react-hot-toast';

function NominationDistrictScreen() {
  const [refreshList, setRefreshList] = useState(false);
  const [nominationDistricts, setNominationDistricts] = useState([]);

  const handleNominationDistrictAdded = () => {
    setRefreshList(!refreshList);
  };

  const fetchNominationDistricts = async () => {
    try {
      const nominationDistricts = await getNominationDistricts(['constituency']);
      return nominationDistricts;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to fetch nomination districts.');
    }
  };

  useEffect(() => {
    fetchNominationDistricts().then((nominationDistricts) => {
      if (nominationDistricts.length > 0) {
        setNominationDistricts(nominationDistricts);
      }
    });
  }, [refreshList]);

  const fields = [
    { name: 'name', type: 'text', label: 'Name', required: true, validate: (value) => value.length >= 3 && value.length <= 100, validateError: 'Nomination district name must be between 3 and 100 characters.' },
    { name: 'constituency', type: 'select', label: 'Constituency', fetchOptions: getConstituencies, required: true },
  ];

  return (
    <div className="flex flex-col w-full h-screen items-center justify-evenly">
      <Header title="Nomination District Management" />
      <div className="flex flex-row justify-center items-start gap-4 h-4/5 w-4/5">
        <AddItem onItemAdded={handleNominationDistrictAdded} addData={addNominationDistrict} itemType='Nomination District' fields={fields} />
        <ListItems
          items={nominationDistricts}
          fetchItemsData={handleNominationDistrictAdded}
          itemType='Nomination District'
          fields={fields}
          updateItem={updateNominationDistrict}
          deleteItem={deleteNominationDistrict}
        />
      </div>
    </div>
  );
}

export default NominationDistrictScreen;

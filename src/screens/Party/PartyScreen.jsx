import { useState, useEffect } from 'react';
import Header from '../../components/misc/Header';
import { getParties } from '../../API';
import { toast } from 'react-hot-toast';
import AddItem from '../../components/AddObject';
import ListItems from '../../components/ListItems';
import { addParty, updateParty, deleteParty } from '../../API';


function PartyScreen() {
  const [refreshList, setRefreshList] = useState(false);
  const [parties, setParties] = useState([]);

  const handlePartyAdded = () => {
    setRefreshList(!refreshList);
  };

  const fetchParties = async () => {
    try {
      const parties = await getParties();
      return parties;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to fetch parties.');
    }
  };

  useEffect(() => {
    fetchParties().then((parties) => {
      if (parties.length > 0) {
        setParties(parties);
      }
    });
  }, [refreshList]);

  const fields = [
    { name: 'name', type: 'text', label: 'Name', required: true, validate: (value) => value.length >= 3 && value.length <= 100, validateError: 'Party name must be between 3 and 100 characters.' },
    { name: 'list', type: 'text', label: 'List', required: true, validate: (value) => value.length == 1 && value.toUpperCase() === value, validateError: 'Party list must be one upper-case character.' }
  ];

  return (
    <div className="flex flex-col w-full h-screen items-center justify-evenly">
      <Header title="Party Management" />
      <div className="flex flex-row justify-center items-start gap-4 h-4/5">
        <AddItem onItemAdded={handlePartyAdded} addData={addParty} itemType='Party' fields={fields} />
        <ListItems
          items={parties}
          fetchItemsData={handlePartyAdded}
          itemType='Party'
          fields={fields}
          updateItem={updateParty}
          deleteItem={deleteParty}
        />
      </div>
    </div>
  );
}

export default PartyScreen;

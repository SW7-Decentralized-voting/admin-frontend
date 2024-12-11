import { useState, useEffect } from 'react';
import Header from '../../components/misc/Header';
import { addConstituency, getConstituencies, deleteConstituency, updateConstituency } from '../../API';
import { toast } from 'react-hot-toast';
import AddItem from '../../components/AddObject';
import ListItems from '../../components/ListItems';

function ConstituencyScreen() {
  const [refreshList, setRefreshList] = useState(false);
  const [constituencies, setConstituencies] = useState([]);

  const handleConstituencyAdded = () => {
    setRefreshList(!refreshList);
  };

  const fetchConstituencies = async () => {
    try {
      const constituencies = await getConstituencies();
      setConstituencies(constituencies);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to fetch constituencies.');
      return [];
    }
  };

  useEffect(() => {
    fetchConstituencies();
  }, [refreshList]);

  const fields = [
    { name: 'name', type: 'text', label: 'Name', required: true, validate: (value) => value.length >= 3 && value.length <= 100, validateError: 'Constituency name must be between 3 and 100 characters.' }
  ];

  return (
    <div className="flex flex-col w-full h-screen items-center justify-evenly">
      <Header title="Constituency Management" />
      <div className="flex flex-row justify-center items-start gap-4 h-4/5 w-4/5">
        <AddItem onItemAdded={handleConstituencyAdded} addData={addConstituency} itemType='Constituency' fields={fields} />
        <ListItems
          items={constituencies}
          fetchItemsData={handleConstituencyAdded}
          itemType='Constituency'
          fields={fields}
          updateItem={updateConstituency}
          deleteItem={deleteConstituency}
        />
      </div>
    </div>
  );
}

export default ConstituencyScreen;

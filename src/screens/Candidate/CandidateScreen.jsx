import { useState, useEffect } from 'react';
import Header from '../../components/misc/Header';
import AddItem from '../../components/AddObject';
import { addCandidate, getParties, getNominationDistricts, getPartyCandidates, updateCandidate, deleteCandidate } from '../../API';
import ListItems from '../../components/ListItems';
import { toast } from 'react-hot-toast';

function CandidateScreen() {
  const [refreshList, setRefreshList] = useState(false);
  const [candidates, setCandidates] = useState([]);

  const handleCandidateAdded = () => {
    setRefreshList(!refreshList);
  };

  const fetchCandidates = async () => {
    try {
      const candidates = await getPartyCandidates(null, ['party', 'nominationDistrict']);
      return candidates;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Failed to fetch candidates.');
      return [];
    }
  };

  useEffect(() => {
    fetchCandidates().then((candidates) => {
      if (candidates || []) {
        setCandidates(candidates);
      }
    });
  }, [refreshList]);

  const fields = [
    {
      name: 'name', type: 'text', label: 'Name', required: true,
      validate: (value) => value.length >= 3 && value.length <= 100, validateError: 'Candidate name must be between 3 and 100 characters.'
    },
    { name: 'party', type: 'select', label: 'Party', fetchOptions: getParties, required: true },
    { name: 'nominationDistrict', type: 'select', label: 'Nomination District', fetchOptions: getNominationDistricts, required: true },
  ];

  return (
    <div className="flex flex-col w-full h-screen items-center justify-evenly">
      <Header title="Candidate Management" />
      <div className="flex flex-row justify-center items-start gap-4 h-4/5 w-4/5">
        <AddItem onItemAdded={handleCandidateAdded} addData={addCandidate} itemType='Candidate' fields={fields} />
        <ListItems
          items={candidates}
          fetchItemsData={handleCandidateAdded}
          itemType='Candidate'
          fields={fields}
          updateItem={updateCandidate}
          deleteItem={deleteCandidate}
        />
      </div>
    </div>
  );
}

export default CandidateScreen;

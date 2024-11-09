import { useState } from 'react';
import Header from '../Components/Header';
import AddParty from './AddParty';
import ListParties from './ListParties';

function PartyScreen() {
  const [refreshList, setRefreshList] = useState(false);

  const handlePartyAdded = () => {
    setRefreshList(!refreshList);
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-evenly">
      <Header title="Party Management" />
      <div className="flex flex-row justify-center items-start gap-4 h-4/5">
        <AddParty onPartyAdded={handlePartyAdded} />
        <ListParties refresh={refreshList} />
      </div>
    </div>
  );
}

export default PartyScreen;
import { useState } from 'react';
import Header from '../../components/misc/Header';
import AddParty from '../../components/party/AddParty';
import ListParties from '../../components/party/ListParties';

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

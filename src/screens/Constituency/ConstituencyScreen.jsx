import { useState } from 'react';
import Header from '../../components/misc/Header';
import AddConstituency from '../../components/constituency/AddConstituency';
import ListConstituencies from '../../components/constituency/ListConstituencies';

function ConstituencyScreen() {
  const [refreshList, setRefreshList] = useState(false);

  const handleConstituencyAdded = () => {
    setRefreshList(!refreshList);
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-evenly">
      <Header title="Constituency Management" />
      <div className="flex flex-row justify-center items-start gap-4 h-4/5">
        <AddConstituency onConstituencyAdded={handleConstituencyAdded} />
        <ListConstituencies refresh={refreshList} />
      </div>
    </div>
  );
}

export default ConstituencyScreen;

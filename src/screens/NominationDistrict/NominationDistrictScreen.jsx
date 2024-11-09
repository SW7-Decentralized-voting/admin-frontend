import { useState } from 'react';
import AddNominationDistrict from './AddNominationDistrict';
import ListDistricts from './ListDistricts';
import Header from '../Components/Header';

function NominationDistrictScreen() {
  const [refreshList, setRefreshList] = useState(false);

  const handleNominationDistrictAdded = () => {
    setRefreshList(!refreshList);
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-evenly">
      <Header title="Nomination District Management" />
      <div className="flex flex-row justify-center items-start gap-4 h-4/5">
        <AddNominationDistrict onDistrictAdded={handleNominationDistrictAdded} />
        <ListDistricts refresh={refreshList} />
      </div>
    </div>
  );
}

export default NominationDistrictScreen;

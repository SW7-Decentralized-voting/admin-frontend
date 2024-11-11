import { useState } from 'react';
import AddNominationDistrict from '../../components/nominationDistrict/AddNominationDistrict';
import ListDistricts from '../../components/nominationDistrict/ListDistricts';
import Header from '../../components/misc/Header';

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

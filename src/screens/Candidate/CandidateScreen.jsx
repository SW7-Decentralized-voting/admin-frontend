import { useState } from 'react';
import Header from '../Components/Header';
import AddCandidate from './AddCandidate';
import ListCandidates from './ListCandidates';

function CandidateScreen() {
  const [refreshList, setRefreshList] = useState(false);

  const handleCandidateAdded = () => {
    setRefreshList(!refreshList);
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-evenly">
      <Header title="Candidate Management" />
      <div className="flex flex-row justify-center items-start gap-4 h-4/5">
        <AddCandidate onCandidateAdded={handleCandidateAdded} />
        <ListCandidates refresh={refreshList} />
      </div>
    </div>
  );
}

export default CandidateScreen;

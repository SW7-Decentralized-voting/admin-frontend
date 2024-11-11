import { useState } from 'react';
import { startElection } from '../../API';
import { toast } from 'react-hot-toast';
import { electionPhaseDetails, ElectionPhases } from '../../components/election/electionPhaseDetails';
import Header from '../../components/misc/Header';

function ElectionScreen() {
  const [electionState, setElectionState] = useState(
    ElectionPhases.NOT_STARTED
  );

  // Function to handle the phase transitions
  const handleStartElection = async () => {
    if (electionState === ElectionPhases.NOT_STARTED) {
      try {
        await startElection();

        // Move to the REGISTRATION phase if the API call succeeds
        setElectionState(ElectionPhases.REGISTRATION);

        toast.success('Election has started successfully!');
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      // Handle other phase transitions as before
      switch (electionState) {
        case ElectionPhases.REGISTRATION:
          setElectionState(ElectionPhases.VOTING);
          break;
        case ElectionPhases.VOTING:
          setElectionState(ElectionPhases.TALLYING);
          break;
        case ElectionPhases.TALLYING:
          setElectionState(ElectionPhases.COMPLETED);
          break;
        default:
          setElectionState(ElectionPhases.NOT_STARTED);
          break;
      }
    }
  };

  // Consolidated function to render the status bar
  const renderStatusBar = () => {
    const { text, icon, color } = electionPhaseDetails[electionState] || {};

    return (
      <div className="p-4 w-full rounded-2xl text-xl font-mono text-white m-5 shadow-md" style={{ backgroundColor: color }}>
        <div className="flex justify-center items-center">
          <span className="text-2xl mr-2">{icon}</span>
          <span className="text-2xl">{text}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-evenly">
      <Header title="Election Phase Management" />
      <div className="flex flex-row justify-center items-start gap-4 h-4/5">
        <div className="card bg-primary text-primary-content">
          <div className="card-body flex flex-col items-center justify-center">
            <h2 className="card-title text-center">Election Phase</h2>
            {renderStatusBar()}
            <button onClick={handleStartElection} className="btn btn-secondary">
              {electionState === ElectionPhases.COMPLETED
                ? 'Restart Election'
                : 'Start Election'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElectionScreen;

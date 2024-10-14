import './ElectionScreen.css';
import { useState } from 'react';
import { startElection } from '../../API/VotingAPI';


const ElectionPhases = {
  NOT_STARTED: 'NOT_STARTED',
  REGISTRATION: 'REGISTRATION',
  VOTING: 'VOTING',
  TALLYING: 'TALLYING',
  COMPLETED: 'COMPLETED',
};

function ElectionScreen() {
  const [electionState, setElectionState] = useState(ElectionPhases.NOT_STARTED);

  // Function to handle the phase transitions
  const handleStartElection = async () => {
    if (electionState === ElectionPhases.NOT_STARTED) {
      try {
        // Call startElection API when starting the election
        const result = await startElection();
        console.log('Election started:', result);

        // Move to the REGISTRATION phase if the API call succeeds
        setElectionState(ElectionPhases.REGISTRATION);
      } catch (error) {
        console.error('Error starting the election:', error);
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


  // Display the current phase in the status bar
  const renderStatusBar = () => {
    switch (electionState) {
      case ElectionPhases.NOT_STARTED:
        return <div className="status-bar">Election not started.</div>;
      case ElectionPhases.REGISTRATION:
        return <div className="status-bar">Registration is ongoing.</div>;
      case ElectionPhases.VOTING:
        return <div className="status-bar">Voting is in progress.</div>;
      case ElectionPhases.TALLYING:
        return <div className="status-bar">Tallying votes.</div>;
      case ElectionPhases.COMPLETED:
        return <div className="status-bar">Election completed.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="election-container">
      <h1>Election Status</h1>
      
      {/* Status Bar */}
      {renderStatusBar()}

      {/* Start Election Button */}
      <div className="button-group">
        <button onClick={handleStartElection} className="election-button">
          {electionState === ElectionPhases.COMPLETED ? 'Restart Election' : 'Start Election'}
        </button>
      </div>

      {/* Back to Home Button */}
      <div className="button-group">
        <button onClick={() => alert("Navigating to home...")} className="election-button">
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ElectionScreen;

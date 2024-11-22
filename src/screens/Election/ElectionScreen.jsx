import { useState } from 'react';
import { startElection } from '../../API';
import { toast } from 'react-hot-toast';
<<<<<<< Updated upstream
import { electionPhaseDetails, ElectionPhases } from '../../components/election/electionPhaseDetails';
import Header from '../../components/misc/Header';

function ElectionScreen() {
  const [electionState, setElectionState] = useState(
    ElectionPhases.NOT_STARTED
  );
=======

// Enum for election phases
const ElectionPhases = {
  NOT_STARTED: 'NOT_STARTED',
  REGISTRATION: 'REGISTRATION',
  VOTING: 'VOTING',
  TALLYING: 'TALLYING',
  COMPLETED: 'COMPLETED',
};

function ElectionScreen() {
  const navigate = useNavigate();
  const [electionState, setElectionState] = useState(ElectionPhases.NOT_STARTED);
  const [voterCount, setVoterCount] = useState(0);
>>>>>>> Stashed changes

  const handleStartElection = async () => {
    if (electionState === ElectionPhases.NOT_STARTED) {
      try {
<<<<<<< Updated upstream
        await startElection();

        // Move to the REGISTRATION phase if the API call succeeds
        setElectionState(ElectionPhases.REGISTRATION);

=======
        // eslint-disable-next-line no-console
        console.log('Starting election with voter count:', voterCount);  // Log for debugging
        await startElection(voterCount);
        setElectionState(ElectionPhases.REGISTRATION);
>>>>>>> Stashed changes
        toast.success('Election has started successfully!');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

<<<<<<< Updated upstream
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
=======
  const handleCyclePhase = () => {
    // eslint-disable-next-line no-console
    console.log('Cycling phase from:', electionState);  // Log the current phase
    switch (electionState) {
      case ElectionPhases.REGISTRATION:
        setElectionState(ElectionPhases.VOTING);
        toast.success('Election phase updated to VOTING');
        break;
      case ElectionPhases.VOTING:
        setElectionState(ElectionPhases.TALLYING);
        toast.success('Election phase updated to TALLYING');
        break;
      case ElectionPhases.TALLYING:
        setElectionState(ElectionPhases.COMPLETED);
        toast.success('Election phase updated to COMPLETED');
        break;
      case ElectionPhases.COMPLETED:
        setElectionState(ElectionPhases.NOT_STARTED);
        toast.success('Election phase reset to NOT_STARTED');
        break;
      default:
        setElectionState(ElectionPhases.REGISTRATION);
        toast.success('Election phase updated to REGISTRATION');
        break;
    }
  };

  const handleVoterCountChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setVoterCount('');
    } else {
      const number = parseInt(value, 10);
      if (!isNaN(number) && number > 0) {
        setVoterCount(number);
      }
    }
  };

  const renderStatusBar = () => {
    switch (electionState) {
      case ElectionPhases.NOT_STARTED:
        return <p>Election has not started yet.</p>;
      case ElectionPhases.REGISTRATION:
        return <p>Voter registration is ongoing.</p>;
      case ElectionPhases.VOTING:
        return <p>Voting is in progress.</p>;
      case ElectionPhases.TALLYING:
        return <p>Votes are being tallied.</p>;
      case ElectionPhases.COMPLETED:
        return <p>The election is completed.</p>;
      default:
        return <p>Unknown election state.</p>;
    }
  };

  return (
    <div className="election-container">
      <h1>Election Status</h1>
      {renderStatusBar()}
      {electionState === ElectionPhases.NOT_STARTED && (
        <div className="input-group">
          <label htmlFor="voterCount">Number of Voters:</label>
          <input
            type="number"
            id="voterCount"
            name="voterCount"
            min="1"
            value={voterCount}
            onChange={handleVoterCountChange}
            className="voter-count-input"
          />
        </div>
      )}
      <div className="button-group">
        <button onClick={handleStartElection} className="election-button">
          {electionState === ElectionPhases.COMPLETED ? 'Restart Election' : 'Start Election'}
        </button>
        <button onClick={() => navigate('/home')} className="election-button">
          Back to Home
        </button>
>>>>>>> Stashed changes
      </div>
      <div className="phase-section">
        <h2>Phase Control</h2>
        <button onClick={handleCyclePhase} className="phase-button">
          {electionState === ElectionPhases.COMPLETED ? 'Reset to Start' : 'Next Phase'}
        </button>
      </div>
    </div>
  );
}

export default ElectionScreen;

import './ElectionScreen.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startElection } from '../../API/VotingAPI';
import { toast } from 'react-hot-toast';
import { FaHourglassStart, FaUserPlus, FaVoteYea, FaChartLine, FaCheckCircle } from 'react-icons/fa'; // Importing icons

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
  const [voterCount, setVoterCount] = useState(3); // New state for voter count

  // Function to handle the phase transitions
  const handleStartElection = async () => {
    if (electionState === ElectionPhases.NOT_STARTED) {
      try {
        // Call startElection API with the current voterCount
        await startElection(voterCount);

        // Move to the REGISTRATION phase if the API call succeeds
        setElectionState(ElectionPhases.REGISTRATION);
        
        toast.success('Election has started successfully!');
      } catch (error) {
        toast.error('Failed to start the election. Please try again.');
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

  // Function to handle voter count changes
  const handleVoterCountChange = (e) => {
    const value = e.target.value;
    // Ensure the value is a positive integer
    if (value === '') {
      setVoterCount('');
    } else {
      const number = parseInt(value, 10);
      if (!isNaN(number) && number > 0) {
        setVoterCount(number);
      }
    }
  };

  // Function to get the corresponding icon based on the election phase
  const getPhaseIcon = () => {
    switch (electionState) {
      case ElectionPhases.NOT_STARTED:
        return <FaHourglassStart />;
      case ElectionPhases.REGISTRATION:
        return <FaUserPlus />;
      case ElectionPhases.VOTING:
        return <FaVoteYea />;
      case ElectionPhases.TALLYING:
        return <FaChartLine />;
      case ElectionPhases.COMPLETED:
        return <FaCheckCircle />;
      default:
        return null;
    }
  };

  // Function to get the corresponding color based on the election phase
  const getPhaseColor = () => {
    switch (electionState) {
      case ElectionPhases.NOT_STARTED:
        return '#6c757d'; // Gray
      case ElectionPhases.REGISTRATION:
        return '#007bff'; // Blue
      case ElectionPhases.VOTING:
        return '#ffc107'; // Yellow
      case ElectionPhases.TALLYING:
        return '#17a2b8'; // Teal
      case ElectionPhases.COMPLETED:
        return '#28a745'; // Green
      default:
        return '#6c757d';
    }
  };

  // Display the current phase in the status bar
  const renderStatusBar = () => {
    let statusText = '';
    switch (electionState) {
      case ElectionPhases.NOT_STARTED:
        statusText = 'Election not started.';
        break;
      case ElectionPhases.REGISTRATION:
        statusText = 'Registration is ongoing.';
        break;
      case ElectionPhases.VOTING:
        statusText = 'Voting is in progress.';
        break;
      case ElectionPhases.TALLYING:
        statusText = 'Tallying votes.';
        break;
      case ElectionPhases.COMPLETED:
        statusText = 'Election completed.';
        break;
      default:
        statusText = '';
        break;
    }

    return (
      <div 
        className="status-bar" 
        style={{ backgroundColor: getPhaseColor() }}
      >
        <div className="status-content">
          <span className="status-icon">{getPhaseIcon()}</span>
          <span className="status-text">{statusText}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="election-container">
      <h1>Election Status</h1>
      
      {/* Status Bar */}
      {renderStatusBar()}

      {/* Voter Count Input */}
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

      {/* Start Election Button */}
      <div className="button-group">
        <button onClick={handleStartElection} className="election-button">
          {electionState === ElectionPhases.COMPLETED ? 'Restart Election' : 'Start Election'}
        </button>
      </div>

      {/* Back to Home Button */}
      <div className="button-group">
        <button onClick={() => navigate('/home')} className="election-button">
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ElectionScreen;

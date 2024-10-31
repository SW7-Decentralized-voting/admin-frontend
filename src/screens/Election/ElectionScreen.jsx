import './ElectionScreen.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startElection } from '../../API/VotingAPI';
import { toast } from 'react-hot-toast';
import { electionPhaseDetails, ElectionPhases } from './electionPhaseDetails';

function ElectionScreen() {
  const navigate = useNavigate();
  const [electionState, setElectionState] = useState(ElectionPhases.NOT_STARTED);
  const [voterCount, setVoterCount] = useState(0); // New state for voter count

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

  // Consolidated function to render the status bar
  const renderStatusBar = () => {
    const { text, icon, color } = electionPhaseDetails[electionState] || {};

    return (
      <div 
        className="status-bar" 
        style={{ backgroundColor: color }}
      >
        <div className="status-content">
          <span className="status-icon">{icon}</span>
          <span className="status-text">{text}</span>
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

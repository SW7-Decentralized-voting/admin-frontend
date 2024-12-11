import { useEffect, useState } from 'react';
import { advancePhase, getElectionPhase, startElection, tally } from '../../API';
import { toast } from 'react-hot-toast';
import { electionPhaseDetails, ElectionPhases } from '../../components/election/electionPhaseDetails';
import Header from '../../components/misc/Header';

function ElectionScreen() {
  const [electionState, setElectionState] = useState(ElectionPhases.NOT_STARTED);

  const fetchElectionState = async () => {
    try {
      const response = await getElectionPhase();
      // Set the election state based on the response. The response will be a string with an integer value representing the phase it should be converted to the corresponding ElectionPhases enum
      setElectionState(ElectionPhases[Object.keys(ElectionPhases)[parseInt(response.currentPhase) + 1]]);
    } catch (error) {
      if (!error.response) {
        // eslint-disable-next-line no-console
        console.error(error);
        toast.error('An error occurred while fetching the election phase');
        return;
      }
      if (error.response.data.error === 'Election has not started') {
        setElectionState(ElectionPhases.NOT_STARTED);
        return;
      }
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    if (electionState === ElectionPhases.COMPLETED) {
      return;
    }
    fetchElectionState();
  }, []);

  // Function to handle the phase transitions
  const handleStartElection = async () => {
    try {
      await startElection();
      setElectionState(ElectionPhases.REGISTRATION);
      toast.success('Election has started successfully!');
      return;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      if (!error.response) {
        toast.error('An error occurred while starting the election');
        return;
      }
      toast.error(error.response.data.error);
      return;

    }

  };

  const advanceElectionPhase = async () => {
    switch (electionState) {
      case ElectionPhases.REGISTRATION:
        await sendAdvancePhaseRequest(ElectionPhases.VOTING);
        break;
      case ElectionPhases.VOTING:
        await sendAdvancePhaseRequest(ElectionPhases.TALLYING);
        break;
      case ElectionPhases.TALLYING:
        // eslint-disable-next-line no-case-declarations
        const confirmed = window.confirm('Are you sure you want to end the election? This action cannot be undone.');
        if (confirmed) {
          await sendAdvancePhaseRequest(ElectionPhases.COMPLETED);
        }
        await sendAdvancePhaseRequest(ElectionPhases.COMPLETED);
        break;
      default:
        setElectionState(ElectionPhases.NOT_STARTED);
        break;
    }
  };

  async function sendAdvancePhaseRequest(phase) {
    try {
      await advancePhase();
      setElectionState(phase);
      toast.success('Phase advanced successfully!');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      if (!error.response) {
        toast.error('An error occurred while advancing the election phase');
        return;
      }
      toast.error(error.response.data.error);
      return;
    }
  }

  // Consolidated function to render the status bar
  const renderStatusBar = () => {
    const { text, icon, color } = electionPhaseDetails[electionState] || {};

    return (
      <div className="p-4 w-full rounded-2xl text-xl font-mono text-white m-5 shadow-md" style={{ backgroundColor: color }}>
        <div className="flex justify-center items-center">
          <span className="text-2xl mr-2">{icon}</span>
          <span className="text-2xl" id='phase-label'>{text}</span>
        </div>
      </div>
    );
  };

  function getAdvanceText(){
    switch (electionState) {
      case ElectionPhases.REGISTRATION:
        return 'Start Voting Phase';
      case ElectionPhases.VOTING:
        return 'End Voting Phase and Start Tallying';
      case ElectionPhases.TALLYING:
        return 'End Election';
      default:
        return 'Start Election';
    }
  }

  const handleTally = async () => {
    try {
      const response = await tally();
      toast.success('Election Tallied Successfully');
      alert(response.tally);
      // eslint-disable-next-line no-console
      console.log(response);
      return;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      if (!error.response) {
        toast.error('An error occurred while tallying the election');
        return;
      }
      toast.error(error.response.data.error);
      return;
    }
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-evenly">
      <Header title="Election Phase Management" />
      <div className="flex flex-row justify-center items-start gap-4 h-4/5">
        <div className="card bg-primary text-primary-content">
          <div className="card-body flex flex-col items-center justify-center">
            <h2 className="card-title text-center">Election Phase</h2>
            {renderStatusBar()}
            {(electionState === ElectionPhases.NOT_STARTED || electionState === ElectionPhases.COMPLETED) ?
              <button onClick={handleStartElection} className="btn btn-secondary" id='advance-btn'>
                {electionState === ElectionPhases.COMPLETED
                  ? 'Restart Election'
                  : 'Start Election'}
              </button> :
              <button onClick={advanceElectionPhase} className="btn btn-secondary" id='advance-btn'>
                {getAdvanceText()}
              </button>
            }

            {electionState === ElectionPhases.TALLYING ? 
              <button onClick={handleTally} className="btn btn-secondary" id='advance-btn'>
                Tally Votes
              </button> : null}

          </div>
        </div>
      </div>
    </div>
  );
}

export default ElectionScreen;

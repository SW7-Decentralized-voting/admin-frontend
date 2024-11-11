import { FaHourglassStart, FaUserPlus, FaVoteYea, FaChartLine, FaCheckCircle } from 'react-icons/fa';

export const ElectionPhases = {
  NOT_STARTED: 'NOT_STARTED',
  REGISTRATION: 'REGISTRATION',
  VOTING: 'VOTING',
  TALLYING: 'TALLYING',
  COMPLETED: 'COMPLETED',
};

export const electionPhaseDetails = {
  [ElectionPhases.NOT_STARTED]: {
    text: 'Election not started.',
    icon: <FaHourglassStart />,
    color: '#6c757d', // Gray
  },
  [ElectionPhases.REGISTRATION]: {
    text: 'Registration is ongoing.',
    icon: <FaUserPlus />,
    color: '#007bff', // Blue
  },
  [ElectionPhases.VOTING]: {
    text: 'Voting is in progress.',
    icon: <FaVoteYea />,
    color: '#ffc107', // Yellow
  },
  [ElectionPhases.TALLYING]: {
    text: 'Tallying votes.',
    icon: <FaChartLine />,
    color: '#17a2b8', // Teal
  },
  [ElectionPhases.COMPLETED]: {
    text: 'Election completed.',
    icon: <FaCheckCircle />,
    color: '#28a745', // Green
  },
};

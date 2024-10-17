import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';

function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Admin Dashboard</h1>
      <div className="button-group">
        <button onClick={() => navigate('/candidates')} className="home-button">
          Add Candidate
        </button>
        <button onClick={() => navigate('/election')} className="home-button">
          Election Status
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;

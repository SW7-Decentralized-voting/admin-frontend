import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';

function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Admin Dashboard</h1>
      <div className="button-group">
        <button onClick={() => navigate('/candidate')} className="home-button">
          Add Candidate
        </button>
        <button onClick={() => navigate('/election')} className="home-button">
          Election Status
        </button>
        <button onClick={() => navigate('/party')} className="home-button">
          Add Party
        </button>
        <button onClick={() => navigate('/nomination-district')} className="home-button">
          Add Nomination District
        </button>
        <button onClick={() => navigate('/constituency')} className="home-button">
          Add Constituency
        </button>
        <button onClick={() => navigate('/polling-station')} className="home-button">
          Add Polling Station
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;

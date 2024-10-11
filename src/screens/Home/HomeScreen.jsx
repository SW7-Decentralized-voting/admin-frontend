import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';

function HomeScreen() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      <h1>Admin Dashboard</h1>
      <div className="button-group">
        <button onClick={() => handleNavigate('/candidates')} className="home-button">
          Add Candidate
        </button>
        <button onClick={() => handleNavigate('/election')} className="home-button">
          Election Status
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;

import { useNavigate } from 'react-router-dom';
import './ElectionScreen.css';

function ElectionScreen() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="election-container">
      <h1>Election Status</h1>
      <div className="button-group">
        <button onClick={() => handleNavigate('/home')} className="election-button">
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ElectionScreen;

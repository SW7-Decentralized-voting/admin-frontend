import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/useAuth';
import './LoginScreen.css';

function LoginScreen() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  // This is the hardcoded password for demonstration purposes.
  // In a real app, you would use a more secure method of authentication.
  const correctPassword = 'password'; 

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check if the entered password matches
    if (password === correctPassword) {
      login(); // Log the user in via context
      navigate('/home');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginScreen;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/useAuth';

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
    <div className='flex flex-1 justify-center items-center w-full h-screen'>
      <form onSubmit={handleLogin}>
        <div className='card bg-primary text-primary-content w-96'>
          <div className='card-body'>
            <h2 className='card-title'>
              Admin
            </h2>
            <label htmlFor='password' className='input input-bordered flex items-center gap-2'>
              Password
              <input
                className='grow bg-white'
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {error && <p className='text-red-800'>{error}</p>}
            <button className='btn btn-secondary' type='submit'>Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginScreen;

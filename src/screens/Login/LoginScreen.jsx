import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../API';
import { jwtDecode } from 'jwt-decode';

function LoginScreen() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // This is the hardcoded password for demonstration purposes.
  // In a real app, you would use a more secure method of authentication.

  const handleLogin = async (e) => {
    e.preventDefault();

    const token = await login(e.target.password.value);
    if (!token) {
      setError('Invalid password');
      return;
    }
    sessionStorage.setItem('jwt', token);
    navigate('/home');
  };

  function getJwtExpiration(token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp ? new Date(decoded.exp * 1000) : null;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('jwt')) {
      if (getJwtExpiration(sessionStorage.getItem('jwt')) > new Date()) {
        navigate('/home');
      } else {
        sessionStorage.removeItem('jwt');
      }
    }
  });

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
                type='password'
                id='password'
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

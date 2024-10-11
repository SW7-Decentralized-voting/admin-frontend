import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default state

  // Function to login (for demonstration, can be tied to your actual login flow)
  const login = () => setIsAuthenticated(true);

  // Function to logout
  const logout = () => setIsAuthenticated(false);

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Add PropTypes validation for children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;

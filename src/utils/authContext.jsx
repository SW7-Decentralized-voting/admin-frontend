import { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext(null);

// Custom hook to use AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// Provider to wrap the App component
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

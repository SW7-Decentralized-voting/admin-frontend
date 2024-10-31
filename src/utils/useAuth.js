import { useContext } from 'react';
import AuthContext from './authContext';

// Custom hook to use AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

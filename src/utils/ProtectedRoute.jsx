import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

function ProtectedRoute({ children }) {
  if (typeof sessionStorage.getItem('jwt') === 'string' && jwtDecode(sessionStorage.getItem('jwt')).exp > new Date().getTime() / 1000) {
    return children;
  }
  
  toast.error('Session expired. Please login again.');
  sessionStorage.removeItem('jwt');
  return <Navigate to="/login" />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

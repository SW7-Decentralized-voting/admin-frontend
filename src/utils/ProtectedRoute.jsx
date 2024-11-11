import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import PropTypes from 'prop-types';

function ProtectedRoute({ children }) {

  return typeof sessionStorage.getItem('jwt') === 'string' ? children : <Navigate to="/login" />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

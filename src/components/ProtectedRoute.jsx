import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute - User:', user, 'Authenticated:', isAuthenticated);

  // Si no está autenticado, lo redirigimos al login
  if (!isAuthenticated) {
    return <Navigate to="/login-usuario" state={{ from: location }} replace />;
  }

  // Si no tiene el rol correcto, lo redirigimos a la página de no autorizado
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // Si todo está bien, muestra el componente hijo
  return children;
};

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired
};

export default ProtectedRoute;
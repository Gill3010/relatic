

import { useAuth } from './AuthContext'; 
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { isAuthenticated, userRole } = useAuth();

  // Si no está autenticado, lo redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/login-usuario" replace />;
  }

  // Si no tiene el rol correcto, lo redirige a la página de no autorizado
  if (requiredRoles && !requiredRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Si todo está bien, muestra el componente solicitado
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
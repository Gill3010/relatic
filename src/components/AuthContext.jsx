// src/components/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Inicializa el estado con los valores de localStorage al cargar la app
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Revisa si existe un token o un rol para considerar al usuario autenticado
    const storedToken = localStorage.getItem('authToken');
    return !!storedToken;
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole');
  });

  const login = (role, token) => {
    setIsAuthenticated(true);
    setUserRole(role);
    // **Almacena el token y el rol en localStorage para la persistencia**
    localStorage.setItem('userRole', role);
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    // **Elimina el token y el rol de localStorage**
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken');
  };

  // Opcional: useEffect para manejar la lógica si el localStorage cambia en otras pestañas
  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem('authToken');
      const storedRole = localStorage.getItem('userRole');
      setIsAuthenticated(!!storedToken);
      setUserRole(storedRole);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const value = { isAuthenticated, userRole, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
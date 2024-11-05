import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Si el usuario está autenticado, redirige al portafolio
    if (isAuthenticated && user) {
      navigate(`/portfolio/${user.userName}`);
    }
  }, [isAuthenticated, user, navigate]);

  // Renderiza el contenido solo si el usuario no está autenticado
  return !isAuthenticated ? children : null;
};

export default ProtectedRoute;

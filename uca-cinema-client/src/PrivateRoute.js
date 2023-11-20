// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  // Verificar si el token está presente en el almacenamiento local o en tu estado de autenticación
  const authToken = localStorage.getItem('authToken');

  // Si el token está presente, permitir el acceso a la ruta, de lo contrario, redirigir a la pantalla de inicio de sesión
  return authToken ? element : <Navigate to="/" />;
};

export default PrivateRoute;

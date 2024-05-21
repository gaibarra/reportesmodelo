// import React from 'react';
import { logout } from '../../api';  // Ajusta la ruta según sea necesario

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await logout();
      alert('Logout successful!');
      // Redirigir o actualizar el estado de la aplicación según sea necesario
    } catch (error) {
      alert('Logout failed!');
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;

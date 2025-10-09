import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, token } = useAuth();

  // 1. Check if the user is logged in at all.
  // We also check for 'user' to make sure the role information has been loaded.
  if (!token || !user) {
    // If not, redirect them to the login page.
    return <Navigate to="/login" />;
  }

  // 2. If they are logged in, check if their role is 'admin'.
  if (user.role !== 'admin') {
    // If not an admin, redirect them to the home page.
    return <Navigate to="/" />;
  }

  // 3. If they are an admin, show the page they were trying to access.
  return children;
};

export default AdminRoute;
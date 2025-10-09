import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SchoolIcon from '@mui/icons-material/School';

const Navbar = () => {
  // Get the user object and logout function from our context
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'var(--primary-color)' }}>
      <Toolbar>
        {/* Site Title / Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'var(--font-headings)' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <SchoolIcon sx={{ mr: 1 }} />
            PraveshPath
          </Link>
        </Typography>

        {/* Navigation Links */}
        <Button color="inherit" component={Link} to="/">Home</Button>
        {user ? (
          // If a user is logged in
          <>
            {user.role === 'admin' && (
              <Button color="inherit" component={Link} to="/admin">Admin</Button>
            )}
            <Button color="inherit" component={Link} to="/shortlist">My Shortlist</Button>
            <Button color="inherit" onClick={handleLogout} sx={{ bgcolor: '#dc3545' }}>Logout</Button>
          </>
        ) : (
          // If no user is logged in
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import the new library

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // When the app starts, check for a token in localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        // Decode the token to get user info and check expiration
        const decodedUser = jwtDecode(storedToken);
        if (decodedUser.exp * 1000 > Date.now()) {
          setUser(decodedUser.user); // The 'user' object from our token payload
        } else {
          // Token is expired
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (userData, newToken) => {
    localStorage.setItem('token', newToken);
    setUser(userData);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  // Now we provide the user object as well
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
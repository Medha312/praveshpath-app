import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useAuth } from './context/AuthContext'; // <-- IMPORT
import './App.css';
import ShortlistPage from './pages/ShortlistPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const { token, logout } = useAuth(); // <-- GET TOKEN AND LOGOUT
// In App.js
// In App.js
return (
  <Router>
    <div className="app-container">
      <Navbar />
      <main style={{ flex: 1 }}> {/* Main content area now fills the space */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/shortlist" element={<ShortlistPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);
}

export default App;
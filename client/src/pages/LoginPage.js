import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const { email, password } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // CORRECTED: Using the environment variable
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, { email, password });
      login(res.data.user, res.data.token); // Pass both user object and token
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      console.error('Login Error:', err.response ? err.response.data : err.message);
      alert('Error: ' + (err.response ? err.response.data.message : 'Could not connect to server'));
    }
  };

  return (
    <div className="main-content"> 
      <h1>Login to Your Account</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
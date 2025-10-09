import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { name, email, password };
      // CORRECTED: Using the environment variable
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, newUser);
      console.log('Success!', res.data);
      alert('Registration successful! Please log in.');
    } catch (err) {
      console.error('Registration Error:', err.response.data);
      alert('Error: ' + err.response.data.message);
    }
  };

  return (
    <div className="main-content">
      <h1>Register for an Account</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={onChange} required minLength="6" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Make sure to update styles if necessary

function Login() {
  const [username, setUsername] = useState('');  // Changed from email to username
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Update the payload to include username instead of email
      const response = await axios.post('http://10.43.248.34/login', { username, password });
      if (response.status === 200) {
        navigate('/dashboard');  // Navigate to the dashboard upon successful login
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed: ' + (error.response?.data?.message || "Unknown Error"));
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <Link to="/signup" className="link">Don't have an account? Signup</Link>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; // Import custom CSS file for styling

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://10.43.248.34/signup', { username, password, address });
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed: ' + (error.response?.data?.message || "Error occurred"));
    }
  };

  return (
    <div className="signup-container page-transition">
      <h2>Signup</h2>
      <form onSubmit={handleSignup} className="signup-form">
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>Address:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        <button type="submit" className="button">Signup</button>
      </form>
      <Link to="/login" className="link">Already have an account? Login</Link>
    </div>
  );
}

export default Signup;

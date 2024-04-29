import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css'; // Import custom CSS file for styling

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const history = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual signup API endpoint
      const response = await axios.post('http://localhost:3000/signup', { email, password, address });
      if (response.status === 201) {
        // Redirect to login on successful signup
        history.push('/login');
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="form-container page-transition">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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

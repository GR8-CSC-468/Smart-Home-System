import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './Form.css'; // Import custom CSS file for styling

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual login API endpoint
      const response = await axios.post('http://localhost:3000/login', { email, password });
      if (response.status === 200) {
        // Redirect to dashboard on successful login
        history.push('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="form-container page-transition">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="button">Login</button>
      </form>
      <Link to="/signup" className="link">Don't have an account? Signup</Link>
    </div>
  );
}

export default Login;

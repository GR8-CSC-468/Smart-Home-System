import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container page-transition">
      <h1>Welcome to SHMS</h1>
      <div className="button-container">
        <Link to="/login" className="button">Login</Link>
        <Link to="/signup" className="button">Signup</Link>
        <Link to="/dashboard" className="button glow">Dashboard</Link>
      </div>
    </div>
  );
}

export default Home;

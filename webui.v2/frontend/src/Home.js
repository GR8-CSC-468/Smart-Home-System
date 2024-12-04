import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container page-transition">
      <div className="content-box">  {/* Wrapper for header and buttons */}
        <h1>Welcome to</h1>
        <h1>Smart Home Management Systems!</h1>
        <div className="button-container">
          <Link to="/login" className="button">Login</Link>
          <Link to="/signup" className="button">Signup</Link>
          <Link to="/dashboard" className="button glow">Dashboard</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

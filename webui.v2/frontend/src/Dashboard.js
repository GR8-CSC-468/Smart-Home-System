import React from 'react';
import './Dashboard.css';

function Dashboard({ username }) {
  // Example URLs - replace with your actual URLs
  const urls = {
    lights: "https://maker.ifttt.com/trigger/turn_lights/with/key/b9F_eA1hMb2duIm8d3fzJc0GXjaL_YVaaYv3c8TcSIx",
    vacuum: "https://maker.ifttt.com/trigger/start_vacuum/with/key/b9F_eA1hMb2duIm8d3fzJc0GXjaL_YVaaYv3c8TcSIx",
    speak: "http://example.com/speak"
  };

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <span>Welcome, {username}!</span>
      </div>
      <div className="dashboard-body">
        <div className="status-panel">
          <h2>Status</h2>
          <p>null</p>
        </div>
        <div className="automation-panel">
          <h2>Automation</h2>
          <button onClick={() => openInNewTab(urls.lights)}>Turn on the Lights</button>
          <button onClick={() => openInNewTab(urls.vacuum)}>Vacuum</button>
          <button onClick={() => openInNewTab(urls.speak)}>Speak</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

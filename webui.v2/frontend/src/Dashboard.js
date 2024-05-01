import React from 'react';
import './Dashboard.css';
import axios from 'axios'; // Import Axios for making HTTP requests

function Dashboard({ username }) {
  // Example URLs - replace with your actual URLs
  const urls = {
    lights: "https://maker.ifttt.com/trigger/Turn_On_Lights/with/key/c1jrdmi8rX__dtHpwBCPt",
    vacuum: "https://maker.ifttt.com/trigger/Cleaning-Has-Started/with/key/c1jrdmi8rX__dtHpwBCPt",
    speak: "http://example.com/speak"
  };

  const handleButtonClick = (url) => {
    // Make a POST request to the URL
    axios.post(url)
      .then(response => {
        console.log('Success:', response.data);
        alert('Action successfully triggered!');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to trigger action. Please try again.');
      });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <span>Welcome, {username}!</span>
      </div>
      <div className="dashboard-body centered">
        <div className="automation-panel">
          <h2>Automation</h2>
          <button onClick={() => handleButtonClick(urls.lights)}>Turn on the Lights</button>
          <button onClick={() => handleButtonClick(urls.vacuum)}>Start the Vacuum</button>
          <button onClick={() => handleButtonClick(urls.speak)}>Activate Speaker</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

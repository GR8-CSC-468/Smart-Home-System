import React from 'react';
import './Dashboard.css';
import axios from 'axios'; // Import Axios for making HTTP requests

function Dashboard({ username }) {
  // URLs for IFTTT actions and backend speech endpoint
  const urls = {
    lights: "https://maker.ifttt.com/trigger/Turn_On_Lights/with/key/c1jrdmi8rX__dtHpwBCPt",
    vacuum: "https://maker.ifttt.com/trigger/Cleaning-Has-Started/with/key/c1jrdmi8rX__dtHpwBCPt",
    speak: "http://10.43.248.34/speak"
  };

  const handleIFTTTAction = (url) => {
    axios.post(url)
      .then(response => {
        // Check if the response has data and is in JSON format
        console.log('IFTTT Response:', response);
        let message = response.data ? JSON.stringify(response.data) : "Success";
        alert(`IFTTT Action Triggered: ${message}`);
      })
      .catch(error => {
        console.error('Error with IFTTT request:', error);
        // If the error has a response and it's JSON, parse and show it
        let errorMessage = error.response && error.response.data ? JSON.stringify(error.response.data) : error.message;
        alert(`Failed to trigger IFTTT action. Error: ${errorMessage}`);
      });
  };

  const handleSpeakAction = () => {
    axios.get(urls.speak)
      .then(response => {
        console.log('Speech action successful:', response);
        alert('Speech action successfully triggered!');
      })
      .catch(error => {
        console.error('Error with Speak request:', error);
        let errorMessage = error.response && error.response.data ? JSON.stringify(error.response.data) : error.message;
        alert(`Failed to trigger speech action. Error: ${errorMessage}`);
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
          <button onClick={() => handleIFTTTAction(urls.lights)}>Turn on the Lights</button>
          <button onClick={() => handleIFTTTAction(urls.vacuum)}>Start the Vacuum</button>
          <button onClick={handleSpeakAction}>Activate Speaker</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

import React from 'react';
import './Dashboard.css';
import axios from 'axios'; // Import Axios for making HTTP requests

function Dashboard({ username }) {
  // Separate the URLs for clarity and error handling
  const urls = {
    lights: "https://maker.ifttt.com/trigger/Turn_On_Lights/with/key/c1jrdmi8rX__dtHpwBCPt",
    vacuum: "https://maker.ifttt.com/trigger/Cleaning-Has-Started/with/key/c1jrdmi8rX__dtHpwBCPt",
    speak: "http://10.43.248.34/speak"  // Assuming this is the correct endpoint for your backend
  };

  const handleIFTTTAction = (url) => {
    axios.post(url)
      .then(response => {
        console.log('Success:', response.data);
        alert('Action successfully triggered: ' + response.data);
      })
      .catch(error => {
        console.error('Error with IFTTT request:', error);
        alert('Failed to trigger IFTTT action. Please try again.');
      });
  };

  const handleSpeakAction = () => {
    axios.get(urls.speak)
      .then(response => {
        console.log('Success:', response.data);
        alert('Speech action successfully triggered!');
      })
      .catch(error => {
        console.error('Error with Speak request:', error);
        alert('Failed to trigger speech action. Please try again.');
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

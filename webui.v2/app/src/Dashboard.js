import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Import custom CSS file for styling

function Dashboard() {
  const [scenario, setScenario] = useState('');

  const handleScenario = async (selectedScenario) => {
    setScenario(selectedScenario);
    try {
      // Replace with your actual scenario API endpoint
      const response = await axios.post('http://localhost:3000/scenario', { scenario: selectedScenario });
      if (response.status === 200) {
        // Play the audio file returned by the API
        const audio = new Audio(response.data.audioUrl);
        audio.play();
      }
    } catch (error) {
      console.error('Scenario execution failed:', error);
    }
  };

  return (
    <div className="dashboard-container page-transition">
      <h2>Dashboard</h2>
      <p>Select a scenario:</p>
      <button onClick={() => handleScenario('magic_morning')} className="button">Magic Morning</button>
      <button onClick={() => handleScenario('magic_evening')} className="button">Magic Evening</button>
      <p>Selected scenario: {scenario}</p>
    </div>
  );
}

export default Dashboard;

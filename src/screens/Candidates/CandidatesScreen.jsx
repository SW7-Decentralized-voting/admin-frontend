import React, { useState } from 'react';
import './CandidatesScreen.css';

function CandidatesScreen() {
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [constituency, setConstituency] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const candidateData = { name, party, constituency };
    console.log(candidateData); // Here, you can add logic to handle the submitted data
    
    // Clear the form after submission
    setName('');
    setParty('');
    setConstituency('');
  };

  return (
    <div className="candidates-container">
      <h1>Add a Candidate</h1>
      <form onSubmit={handleSubmit} className="candidate-form">
        <div className="form-group">
          <label htmlFor="name">Candidate Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="party">Party:</label>
          <select
            id="party"
            value={party}
            onChange={(e) => setParty(e.target.value)}
            required
          >
            <option value="">Select Party</option>
            <option value="Party A">Party A</option>
            <option value="Party B">Party B</option>
            <option value="Party C">Party C</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="constituency">Constituency (optional):</label>
          <input
            type="text"
            id="constituency"
            value={constituency}
            onChange={(e) => setConstituency(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Add Candidate</button>
      </form>
    </div>
  );
}

export default CandidatesScreen;

import { useState } from 'react';
import './PartyScreen.css';

function PartyScreen() {
  const [partyName, setPartyName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // const partyData = { partyName, leader, foundationYear };

    // Clear the form after submission
    setPartyName('');
  };

  return (
    <div className="party-container">
      <h1>Add a Party</h1>
      <form onSubmit={handleSubmit} className="party-form">
        <div className="form-group">
          <label htmlFor="partyName">Party Name:</label>
          <input
            type="text"
            id="partyName"
            value={partyName}
            onChange={(e) => setPartyName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Party</button>
      </form>
    </div>
  );
}

export default PartyScreen;

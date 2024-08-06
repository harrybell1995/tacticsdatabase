import { useState } from 'react';

export default function TacticForm() {
  const [tacticName, setTacticName] = useState('');
  const [description, setDescription] = useState('');
  const [formation, setFormation] = useState('');
  const [owner, setOwner] = useState('');
  const [positions, setPositions] = useState('');
  const [roles, setRoles] = useState('');
  const [strategies, setStrategies] = useState('');
  const [playerAttributes, setPlayerAttributes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      tactic_name: tacticName,
      description,
      formation,
      owner,
      positions: JSON.parse(positions),
      roles: JSON.parse(roles),
      strategies: JSON.parse(strategies),
      player_attributes: JSON.parse(playerAttributes),
    };

    try {
      const response = await fetch('/api/add-tactic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setSuccess('Tactic submitted successfully!');
      setError('');
    } catch (error) {
      setError('Error submitting tactic: ' + error.message);
      setSuccess('');
    }
  };

  return (
    <div className="form-container">
      <h1>Submit Your Tactic</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tactic_name">Tactic Name</label>
          <select id="tactic_name" value={tacticName} onChange={(e) => setTacticName(e.target.value)}>
            <option value="">Select Tactic</option>
            <option value="4-4-2 Classic">4-4-2 Classic</option>
            <option value="4-3-3 Attack">4-3-3 Attack</option>
            <option value="3-5-2 Midfield">3-5-2 Midfield</option>
            <option value="5-3-2 Defensive">5-3-2 Defensive</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            placeholder="Describe the tactic..."
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="formation">Formation</label>
          <select id="formation" value={formation} onChange={(e) => setFormation(e.target.value)}>
            <option value="">Select Formation</option>
            <option value="4-4-2">4-4-2</option>
            <option value="4-3-3">4-3-3</option>
            <option value="3-5-2">3-5-2</option>
            <option value="5-3-2">5-3-2</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="owner">Owner</label>
          <select id="owner" value={owner} onChange={(e) => setOwner(e.target.value)}>
            <option value="">Select Owner</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Alex Johnson">Alex Johnson</option>
            <option value="Emily Davis">Emily Davis</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="positions">Positions (JSON format)</label>
          <textarea
            id="positions"
            value={positions}
            onChange={(e) => setPositions(e.target.value)}
            rows="4"
            placeholder='e.g., [{"id":"gk","label":"Goalkeeper","role":"Defend"}]'
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="roles">Roles (JSON format)</label>
          <textarea
            id="roles"
            value={roles}
            onChange={(e) => setRoles(e.target.value)}
            rows="4"
            placeholder='e.g., [{"role":"Goalkeeper","focus":"Defend"}]'
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="strategies">Strategies (JSON format)</label>
          <textarea
            id="strategies"
            value={strategies}
            onChange={(e) => setStrategies(e.target.value)}
            rows="4"
            placeholder='e.g., [{"strategy":"Pressing","intensity":"High"}]'
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="player_attributes">Player Attributes (JSON format)</label>
          <textarea
            id="player_attributes"
            value={playerAttributes}
            onChange={(e) => setPlayerAttributes(e.target.value)}
            rows="4"
            placeholder='e.g., [{"player_id":1,"attribute":"Speed","value":90}]'
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

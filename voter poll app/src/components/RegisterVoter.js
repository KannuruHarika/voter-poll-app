import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterVoter.css';

function RegisterVoter() {
  const [voterID, setVoterID] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/register/', { voter_id: voterID });
      alert(response.data.message);
      navigate('/'); // Navigate back to home after successful registration
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setVoterID(input);

    if (input.length !== 7) {
      setErrorMessage('Voter ID must be exactly 7 digits');
    } else {
      setErrorMessage('');
    }
  };

  return (
    <div className="register-voter-container">
      <h2 className="heading">Register Voter</h2>
      <input
        type="text"
        value={voterID}
        onChange={handleChange}
        placeholder="Enter Your 7-Digit Voter ID"
        className="input-field"
        maxLength={7} // Ensure input doesn't exceed 7 digits
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {voterID.length === 7 && !errorMessage && (
        <button onClick={handleRegister} className="nav-button">Register</button>
      )}
    </div>
  );
}

export default RegisterVoter;

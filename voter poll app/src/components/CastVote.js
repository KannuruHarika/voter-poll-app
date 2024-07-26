import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CastVote.css';
import bjpLogo from '../images/BJP.png';
import incLogo from '../images/INC.png';
import aapLogo from '../images/AAP.png';

function CastVote() {
  const [voterID, setVoterID] = useState('');
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [voteConfirmation, setVoteConfirmation] = useState(null);
  const navigate = useNavigate();

  const partyLogos = {
    BJP: bjpLogo,
    INC: incLogo,
    AAP: aapLogo
  };

  const checkVoterStatus = async (voterID) => {
    try {
      const response = await axios.post('http://localhost:8000/api/check_voter_status/', { voter_id: voterID });
      if (response.data.already_voted) {
        setAlreadyVoted(true);
        setErrorMessage('You have already voted.');
      } else {
        setAlreadyVoted(false);
        setErrorMessage('');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('Voter ID not registered');
      } else {
        setErrorMessage('Error checking voter status');
      }
      setAlreadyVoted(false);
    }
  };

  const handleVote = async (party) => {
    if (alreadyVoted) {
      alert('You have already voted.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/vote/', { voter_id: voterID, party });
      setSuccessMessage(response.data.message);
      setVoteConfirmation(party);
      setTimeout(() => {
        setVoteConfirmation(null);
        setVoterID('');
        setSuccessMessage('');
        navigate('/');
      }, 5000); // Display vote confirmation for 5 seconds and then navigate to home page
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setSuccessMessage('');
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setVoterID(input);
    setErrorMessage('');
    setSuccessMessage('');

    if (input.length === 7) {
      checkVoterStatus(input);
    } else {
      setAlreadyVoted(false);
      if (input.length > 0 && input.length !== 7) {
        setErrorMessage('Voter ID must be exactly 7 digits');
      }
    }
  };

  return (
    <div className="cast-vote-container">
      {!voteConfirmation && <h2 className="heading">Cast Your Vote</h2>}
      <input
        type="text"
        value={voterID}
        onChange={handleChange}
        placeholder="Enter Your 7-Digit Voter ID"
        className="input-field"
        maxLength={7} // Ensure input doesn't exceed 7 digits
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {voteConfirmation && (
        <div className="confirmation-message">
          <img src={partyLogos[voteConfirmation]} alt={voteConfirmation} className="party-logo-small" />
          <span>You voted for {voteConfirmation}</span>
          <p className="success-notice">Your vote has been casted successfully!</p>
        </div>
      )}
      {successMessage && !voteConfirmation && <p className="success-message">{successMessage}</p>}
      {(!voteConfirmation && (successMessage || errorMessage)) && (
        <button className="home-button" onClick={() => navigate('/')}>
          Back to Home
        </button>
      )}
      {!alreadyVoted && !errorMessage && !voteConfirmation && (
        <div className="button-container">
          <button className="party-button" onClick={() => handleVote('BJP')} disabled={voterID.length !== 7}>
            <img src={bjpLogo} alt="BJP" className="party-logo" />
            <span>Bharatiya Janata Party (BJP)</span>
          </button>
          <button className="party-button" onClick={() => handleVote('INC')} disabled={voterID.length !== 7}>
            <img src={incLogo} alt="INC" className="party-logo" />
            <span>Indian National Congress (INC)</span>
          </button>
          <button className="party-button" onClick={() => handleVote('AAP')} disabled={voterID.length !== 7}>
            <img src={aapLogo} alt="AAP" className="party-logo" />
            <span>Aam Aadmi Party (AAP)</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default CastVote;

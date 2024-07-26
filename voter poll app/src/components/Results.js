import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Results.css';
import bjpLogo from '../images/BJP.png';
import incLogo from '../images/INC.png';
import aapLogo from '../images/AAP.png';

const partyLogos = {
  BJP: bjpLogo,
  INC: incLogo,
  AAP: aapLogo
};

function Results() {
  const [results, setResults] = useState([]);
  const [highestVotedParty, setHighestVotedParty] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/results/');
        setResults(response.data.results);
        setHighestVotedParty(response.data.highest_voted_party);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setError('Voting is not complete yet , results will be displayed soon once the whole voting process is completed!');
        } else {
          setError('An error occurred while fetching results.');
        }
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="results-container">
      <h2 className="heading">Election Results</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <div className="results-list">
            {results.map((result, index) => (
              <div key={index} className="result-item">
                <img src={partyLogos[result.party]} alt={result.party} className="party-logo" />
                <span className="party-name">{result.party}</span>
                <span className="vote-count">{result.count} votes</span>
              </div>
            ))}
          </div>
          {highestVotedParty && (
            <div className="congratulations-message">
              <img src={partyLogos[highestVotedParty.party]} alt={highestVotedParty.party} className="party-logo" />
              <span>Congratulations to {highestVotedParty.party}!</span>
              <p className="congratulations-emojis">🎉🎊🎈</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Results;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="main-heading">Welcome to Voter Poll Application</h1>
      <p className="sub-heading">Please use the buttons below to register, vote, or see the results.</p>
      <div className="button-container">
        <button className="nav-button" onClick={() => navigate('/register')}>Register Voter</button>
        <button className="nav-button" onClick={() => navigate('/vote')}>Cast Vote</button>
        <button className="nav-button" onClick={() => navigate('/results')}>Results</button>
      </div>
    </div>
  );
}

export default Home;

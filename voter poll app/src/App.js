import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import RegisterVoter from './components/RegisterVoter';
import CastVote from './components/CastVote';
import Results from './components/Results';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<RegisterVoter />} />
          <Route path="/vote" element={<CastVote />} />
          <Route path="/results" element={<Results />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Prediction from './pages/Prediction';
import Leaderboard from './pages/Leaderboard';
import Profile from './components/Profile';
import History from './components/PredictionHistory';
import ThemeToggle from './components/ThemeToggle';
import Settings from './components/Settings'; //
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/predict" element={<Prediction />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/theme" element={<ThemeToggle />} />
          <Route path="/settings" element={<Settings />} />{' '}
          
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

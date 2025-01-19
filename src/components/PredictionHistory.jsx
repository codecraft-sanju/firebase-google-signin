// src/pages/History.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const PredictionHistory = () => {
  const { theme } = useContext(ThemeContext);

  const historyData = [
    {
      id: 1,
      match: 'Match 1: Team A vs Team B',
      prediction: 'Team A',
      result: 'Won',
      points: 10,
    },
    {
      id: 2,
      match: 'Match 2: Team C vs Team D',
      prediction: 'Team D',
      result: 'Lost',
      points: 0,
    },
    {
      id: 3,
      match: 'Match 3: Team E vs Team F',
      prediction: 'Team F',
      result: 'Pending',
      points: 'N/A',
    },
  ];

  return (
    <div
      className={`p-6 min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <h1 className="mb-4 text-3xl font-bold">Prediction History</h1>
      {historyData.map((entry) => (
        <div
          key={entry.id}
          className={`p-4 mb-4 rounded-lg shadow-md ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-semibold">{entry.match}</h2>
          <p className="mt-2">
            <span className="font-medium">Prediction: </span>
            {entry.prediction}
          </p>
          <p>
            <span className="font-medium">Result: </span>
            <span
              className={`${
                entry.result === 'Won'
                  ? 'text-green-500'
                  : entry.result === 'Lost'
                  ? 'text-red-500'
                  : 'text-yellow-500'
              }`}
            >
              {entry.result}
            </span>
          </p>
          <p>
            <span className="font-medium">Points: </span>
            {entry.points}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PredictionHistory;

// src/pages/Leaderboard.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Leaderboard = () => {
  const { theme } = useContext(ThemeContext);

  const leaderboard = [
    { name: 'Alice', points: 120 },
    { name: 'Bob', points: 100 },
    { name: 'Charlie', points: 90 },
    { name: 'Diana', points: 80 },
    { name: 'Eve', points: 70 },
  ];

  return (
    <div
      className={`p-6 min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <h1 className="mb-6 text-3xl font-bold text-center">Leaderboard</h1>
      <div
        className={`p-4 rounded-lg shadow-md ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-600">Rank</th>
              <th className="px-4 py-2 border-b border-gray-600">Name</th>
              <th className="px-4 py-2 border-b border-gray-600">Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr
                key={index}
                className={`${
                  theme === 'dark'
                    ? index % 2 === 0
                      ? 'bg-gray-700'
                      : 'bg-gray-800'
                    : index % 2 === 0
                    ? 'bg-gray-100'
                    : 'bg-white'
                }`}
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.points} pts</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;

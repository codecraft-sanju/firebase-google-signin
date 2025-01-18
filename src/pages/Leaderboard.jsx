// src/pages/Leaderboard.jsx
import React from 'react';

const Leaderboard = () => {
  const leaderboard = [
    { name: 'Alice', points: 120 },
    { name: 'Bob', points: 100 },
    { name: 'Charlie', points: 90 },
  ];

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Leaderboard</h1>
      <ul>
        {leaderboard.map((user, index) => (
          <li key={index} className="flex justify-between p-2 text-lg border-b">
            <span>{user.name}</span>
            <span>{user.points} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;

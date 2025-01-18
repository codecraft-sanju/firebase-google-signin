// src/components/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="w-12 h-12 rounded-full"
            />
          )}
          <div className="ml-3">
            <h1 className="text-xl font-bold">{user?.displayName}</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-600 rounded-lg shadow-md"
        >
          Log Out
        </button>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => navigate('/predict')}
          className="block w-full px-4 py-2 text-center text-white bg-green-600 rounded-lg"
        >
          Make Predictions
        </button>
        <button
          onClick={() => navigate('/leaderboard')}
          className="block w-full px-4 py-2 text-center text-white bg-blue-600 rounded-lg"
        >
          View Leaderboard
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

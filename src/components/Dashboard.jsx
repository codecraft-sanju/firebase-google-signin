import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { ThemeContext } from '../context/ThemeContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage first
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      setUser(storedUser);
    } else {
      const currentUser = auth.currentUser;
      setUser(currentUser);
      if (currentUser) {
        localStorage.setItem('user', JSON.stringify(currentUser)); // Store user in localStorage
      }
    }
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem('user'); // Remove user data from localStorage on logout
    navigate('/');
  };

  const userStats = {
    totalPredictions: 25,
    correctPredictions: 18,
    incorrectPredictions: 7,
    points: 120,
  };

  const recentActivities = [
    {
      activity: 'Predicted Match 1: Team A vs Team B',
      status: 'Won',
      points: 10,
    },
    {
      activity: 'Predicted Match 2: Team C vs Team D',
      status: 'Lost',
      points: 0,
    },
    {
      activity: 'Predicted Match 3: Team E vs Team F',
      status: 'Pending',
      points: 0,
    },
  ];

  return (
    <div
      className={`p-6 min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* User Info and Toggle Section */}
      <div className="flex flex-col items-center justify-between mb-6 sm:flex-row">
        <div className="flex items-center mb-4 sm:mb-0">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-16 h-16 bg-gray-300 rounded-full">
              {/* Fallback Avatar */}
              <span className="text-xl text-white">
                {user?.displayName?.charAt(0)}
              </span>
            </div>
          )}
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{user?.displayName}</h1>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg shadow-md ${
              theme === 'dark'
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-800 text-white'
            }`}
          >
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-600 rounded-lg shadow-md"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}
      >
        <div
          className={`p-4 rounded-lg shadow-md ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h3 className="text-xl font-semibold">Total Predictions</h3>
          <p className="text-3xl">{userStats.totalPredictions}</p>
        </div>
        <div
          className={`p-4 rounded-lg shadow-md ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h3 className="text-xl font-semibold">Correct Predictions</h3>
          <p className="text-3xl text-green-500">
            {userStats.correctPredictions}
          </p>
        </div>
        <div
          className={`p-4 rounded-lg shadow-md ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h3 className="text-xl font-semibold">Points</h3>
          <p className="text-3xl">{userStats.points} pts</p>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div
        className={`mb-6 p-6 rounded-lg shadow-md ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h3 className="mb-4 text-xl font-semibold">Recent Activities</h3>
        {recentActivities.map((activity, index) => (
          <div
            key={index}
            className={`p-4 mb-4 rounded-lg shadow-md ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            }`}
          >
            <p className="text-lg font-medium">{activity.activity}</p>
            <p
              className={`text-sm ${
                activity.status === 'Won'
                  ? 'text-green-500'
                  : activity.status === 'Lost'
                  ? 'text-red-500'
                  : 'text-yellow-500'
              }`}
            >
              {activity.status} - {activity.points} points
            </p>
          </div>
        ))}
      </div>

      {/* Navigation Buttons Section */}
      <div className="space-y-4">
        <button
          onClick={() => navigate('/predict')}
          className="block w-full px-4 py-2 text-center text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          Make Predictions
        </button>
        <button
          onClick={() => navigate('/leaderboard')}
          className="block w-full px-4 py-2 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          View Leaderboard
        </button>

        <button
          onClick={() => navigate('/profile')}
          className="block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-lg hover:bg-gray-700"
        >
          View Profile
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="block w-full px-4 py-2 text-center text-white bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Settings
        </button>
        <button
          onClick={() => navigate('/help')}
          className="block w-full px-4 py-2 text-center text-white bg-yellow-600 rounded-lg hover:bg-yellow-700"
        >
          Help & Support
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

// src/components/ThemeToggle.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`p-4 h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <h1 className="mb-4 text-2xl font-bold">Theme Settings</h1>
      <p className="mb-6">Switch between Light and Dark themes.</p>
      <button
        onClick={toggleTheme}
        className={`px-6 py-2 font-semibold rounded-lg shadow-md ${
          theme === 'dark'
            ? 'bg-yellow-500 text-black'
            : 'bg-gray-800 text-white'
        }`}
      >
        Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
};

export default ThemeToggle;

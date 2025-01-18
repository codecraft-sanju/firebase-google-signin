// src/pages/Prediction.jsx
import React, { useState } from 'react';

const Prediction = () => {
  const [events, setEvents] = useState([
    { id: 1, name: 'Match 1: Team A vs Team B', options: ['Team A', 'Team B'] },
    { id: 2, name: 'Match 2: Team C vs Team D', options: ['Team C', 'Team D'] },
  ]);

  const handlePrediction = (eventId, choice) => {
    alert(`Prediction submitted: Event ${eventId}, Choice: ${choice}`);
    // Save the prediction to Firebase Firestore
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Predict the Outcome</h1>
      {events.map((event) => (
        <div key={event.id} className="p-4 mb-4 border rounded-lg">
          <h2 className="text-xl font-semibold">{event.name}</h2>
          <div className="flex mt-2 space-x-4">
            {event.options.map((option) => (
              <button
                key={option}
                onClick={() => handlePrediction(event.id, option)}
                className="px-4 py-2 text-white bg-green-600 rounded-lg"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Prediction;

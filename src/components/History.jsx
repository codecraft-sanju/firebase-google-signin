// src/components/History.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../services/firebase';

const History = () => {
  const user = auth.currentUser;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const q = query(
          collection(db, 'predictions'),
          where('userId', '==', user.uid),
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Prediction History</h1>
      {history.map((item, index) => (
        <div key={index} className="p-4 mb-4 border rounded-lg bg-gray-50">
          <h2 className="text-lg font-semibold">{item.eventName}</h2>
          <p className="text-gray-600">Prediction: {item.choice}</p>
          <p className="text-gray-600">
            Date: {new Date(item.timestamp).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default History;

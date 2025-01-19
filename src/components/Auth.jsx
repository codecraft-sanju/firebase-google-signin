// src/components/Auth.jsx
import React, { useEffect } from 'react';
import { auth } from '../services/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="text-center text-white">
        <h1 className="mb-4 text-4xl font-bold">Welcome to Predictify!</h1>
        <p className="mb-6 text-lg">
          Make predictions, climb the leaderboard, and earn rewards.
        </p>
        <button
          onClick={handleLogin}
          className="px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;

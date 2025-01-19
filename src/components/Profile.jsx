// src/components/Profile.jsx
import React, { useState } from 'react';
import { auth, db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';

const Profile = () => {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [avatar, setAvatar] = useState(user?.photoURL || '');

  const handleSave = async () => {
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { displayName, photoURL: avatar }, { merge: true });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Edit Profile</h1>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-lg font-semibold">
            Display Name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 text-lg font-semibold">Avatar URL</label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button
          onClick={handleSave}
          className="px-6 py-2 text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;

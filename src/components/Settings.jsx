import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../services/firebase';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext'; // Import the ThemeContext

const Settings = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const { darkMode } = useContext(ThemeContext); // Access darkMode from ThemeContext

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [email, setEmail] = useState(user?.email || '');
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      // If a file is selected, upload it and update the photoURL
      if (file) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        const photoURL = await fileRef.getDownloadURL();

        await updateProfile(auth.currentUser, {
          displayName,
          photoURL,
        });
      } else {
        await updateProfile(auth.currentUser, {
          displayName,
          photoURL,
        });
      }
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile: ', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
    }
  };

  return (
    <div
      className={`p-6 space-y-6 ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div
        className={`p-6 rounded-lg shadow-md ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h2 className="mb-4 text-xl font-bold">Profile Settings</h2>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className={`w-full px-4 py-2 mt-2 border rounded-md ${
                darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
              }`}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 mt-2 border rounded-md ${
                darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
              }`}
              required
            />
          </div>

          <div>
            <label htmlFor="file" className="block text-sm font-medium">
              Profile Picture
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className={`w-full mt-2 ${
                darkMode ? 'text-white' : 'text-black'
              }`}
            />
            {photoURL && (
              <div className="mt-4">
                <img
                  src={photoURL}
                  alt="Profile"
                  className="w-24 h-24 rounded-full"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 rounded-md ${
              darkMode ? 'bg-blue-600' : 'bg-blue-500'
            } text-white`}
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;

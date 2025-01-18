
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDbYxoaLf8lnm9gs-B5mceP2yjC3FVUEb0',
  authDomain: 'prediction-app-a559d.firebaseapp.com',
  projectId: 'prediction-app-a559d',
  storageBucket: 'prediction-app-a559d.firebasestorage.app',
  messagingSenderId: '550480609791',
  appId: '1:550480609791:web:ade9db418880b0688367ca',
  measurementId: 'G-S9PTD0MBBM',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

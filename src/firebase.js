// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDNeBgPkWhCsjy5Gj1xAZMk1iKq4uBxvds",
    authDomain: "cursor-ai-helped-create-this.firebaseapp.com",
    projectId: "cursor-ai-helped-create-this",
    storageBucket: "cursor-ai-helped-create-this.firebasestorage.app",
    messagingSenderId: "339114149526",
    appId: "1:339114149526:web:f6cf9f5b59400c6c1ba4b7",
    measurementId: "G-GKTY3FCHJK"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
// This is your new file: src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- PASTE YOUR CONFIG KEYS FROM FIREBASE HERE ---
const firebaseConfig = {
  apiKey: "AIzaSyBL2C8wo_1QC3MJEWpXZKBFDLzehoL2hos",
  authDomain: "gen-lang-client-0138970570.firebaseapp.com",
  projectId: "gen-lang-client-0138970570",
  storageBucket: "gen-lang-client-0138970570.firebasestorage.app",
  messagingSenderId: "1081334226871",
  appId: "1:1081334226871:web:84f7c8751a9c87727d5232",
  measurementId: "G-GQ41Q6LM3Q"
};
// -------------------------------------------------


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export our two services
// We'll use these in our components
export const auth = getAuth(app);
export const db = getFirestore(app); // We'll use this for the database later
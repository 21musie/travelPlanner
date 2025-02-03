// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZgQ-FeFS4qggfGvAzWN_OLP5KqbB81Hk",
    authDomain: "travelp2-43577.firebaseapp.com",
    projectId: "travelp2-43577",
    storageBucket: "travelp2-43577.firebasestorage.app",
    messagingSenderId: "399763371366",
    appId: "1:399763371366:web:ffffa98f3eb799a73ac4a7",
    measurementId: "G-5RTE697GEW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
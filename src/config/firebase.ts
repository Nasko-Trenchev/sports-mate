// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDi5WGkA4gw6MA0ETYSy8uKfmXkunoR3Sc",
    authDomain: "sportsmate-335ef.firebaseapp.com",
    projectId: "sportsmate-335ef",
    storageBucket: "sportsmate-335ef.appspot.com",
    messagingSenderId: "253857880255",
    appId: "1:253857880255:web:97f29415ffa61e6d9bce0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app);
export const storage = getStorage(app);
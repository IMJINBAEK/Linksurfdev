// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWjLQj69MJFFY8XYUqB5eysxY1nWeLvAE",
  authDomain: "linksurf-72722.firebaseapp.com",
  projectId: "linksurf-72722",
  storageBucket: "linksurf-72722.appspot.com",
  messagingSenderId: "900205340535",
  appId: "1:900205340535:web:8a21de2b4885474039e372",
  measurementId: "G-LRC30N3Y9E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db= getFirestore(app);
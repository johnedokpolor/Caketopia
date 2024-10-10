// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByJWIJcADiE8gm63urr4q4mDU65mNCiPw",
  authDomain: "glai-f1b42.firebaseapp.com",
  projectId: "glai-f1b42",
  storageBucket: "glai-f1b42.appspot.com",
  messagingSenderId: "870120977338",
  appId: "1:870120977338:web:26616cad53f87397c5e383",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { app, auth, db, provider };

import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import 'firebase/compat/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3QzSxusbrO8mJKVJwrPV-wKrNJAOjb04",
  authDomain: "netflix-clone-769c6.firebaseapp.com",
  projectId: "netflix-clone-769c6",
  storageBucket: "netflix-clone-769c6.appspot.com",
  messagingSenderId: "55671778257",
  appId: "1:55671778257:web:39b201f2554c3498968ef0"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
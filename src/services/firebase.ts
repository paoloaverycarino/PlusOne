// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJTf0vpWYxRtqv0MIOFNPdU_PiEMdaQeA",
  authDomain: "plusone-42be4.firebaseapp.com",
  projectId: "plusone-42be4",
  storageBucket: "plusone-42be4.firebasestorage.app",
  messagingSenderId: "615275828959",
  appId: "1:615275828959:web:176d086a5394a69cb93b6a",
  measurementId: "G-3QLQNN5W9T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
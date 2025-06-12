// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABcde7nM8mLPxXcU0Yw_yvNG8kx_8sFqU",
  authDomain: "fbclaseprueba.firebaseapp.com",
  projectId: "fbclaseprueba",
  storageBucket: "fbclaseprueba.firebasestorage.app",
  messagingSenderId: "289227959964",
  appId: "1:289227959964:web:c8648867fb850880c2c759",
  measurementId: "G-KXHB67QBSN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Analytics = getAnalytics(app);
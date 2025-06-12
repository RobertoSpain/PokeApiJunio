// Importa las funciones necesarias de los SDKs de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyABcde7nM8mLPxXcU0Yw_yvNG8kx_8sFqU",
  authDomain: "fbclaseprueba.firebaseapp.com",
  projectId: "fbclaseprueba",
  storageBucket: "fbclaseprueba.firebasestorage.app",
  messagingSenderId: "289227959964",
  appId: "1:289227959964:web:c8648867fb850880c2c759",
  measurementId: "G-KXHB67QBSN"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
// Inicializa Firestore
export const db = getFirestore(app);
// Inicializa Auth (opcional, si usas autenticación)
export const auth = getAuth(app);
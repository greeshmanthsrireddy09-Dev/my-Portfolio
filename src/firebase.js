import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC48QBLhBtwV9Q3hGpMxT3sLmNrqsmDOiI",
  authDomain: "my-portfolio-greeshmanth.firebaseapp.com",
  projectId: "my-portfolio-greeshmanth",
  storageBucket: "my-portfolio-greeshmanth.firebasestorage.app",
  messagingSenderId: "341352769121",
  appId: "1:341352769121:web:bad9a46bb9eeff5f77ec20",
  measurementId: "G-WSH6TKM1NB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC48QBLhBtwV9Q3hGpMxT3sLmNrqsmDOiI",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "my-portfolio-greeshmanth.firebaseapp.com",
  projectId:
    import.meta.env.VITE_FIREBASE_PROJECT_ID || "my-portfolio-greeshmanth",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "my-portfolio-greeshmanth.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "341352769121",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:341352769121:web:bad9a46bb9eeff5f77ec20",
  measurementId:
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-WSH6TKM1NB",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
  useFetchStreams: false,
});
export const ADMIN_EMAIL =
  (import.meta.env.VITE_ADMIN_EMAIL || "").trim().toLowerCase();

const rawAdminPath =
  (import.meta.env.VITE_ADMIN_PATH || "/ops-7x9-private").trim() || "/ops-7x9-private";
export const ADMIN_PATH = rawAdminPath.startsWith("/")
  ? rawAdminPath
  : `/${rawAdminPath}`;

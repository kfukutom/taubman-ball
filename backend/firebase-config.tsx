import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";

//require('dotenv').config();
const API_KEY = process.env.API_KEY;

const firebaseConfig = {
  apiKey: "AIzaSyBACoqsoCaDnUr_IE2pffR7HnT9fADCdYc",
  authDomain: "ut-230.firebaseapp.com",
  projectId: "ut-230",
  storageBucket: "ut-230.firebasestorage.app",
  messagingSenderId: "103408880772",
  appId: "1:103408880772:web:fe47943587c55ca90786d1",
  measurementId: "G-8111X1D5XD",
};

// Initialization:
const app = initializeApp(firebaseConfig);
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const db: Firestore = getFirestore(app);

export { app, db, analytics };
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuw2JlF95cUEvijGL_BluMu39ka1okohg",
  authDomain: "resume-crafts.firebaseapp.com",
  projectId: "resume-crafts",
  storageBucket: "resume-crafts.firebasestorage.app",
  messagingSenderId: "17082405657",
  appId: "1:17082405657:web:3d71b480717478bc7aeb88",
  measurementId: "G-YS549GM0KR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);

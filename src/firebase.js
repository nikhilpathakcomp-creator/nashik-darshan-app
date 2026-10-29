import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyRTN6gV12KDW6Tj_RQZgQZAah6BIg2Q0",
  authDomain: "nashik-darshan-90925.firebaseapp.com",
  projectId: "nashik-darshan-90925",
  storageBucket: "nashik-darshan-90925.firebasestorage.app",
  messagingSenderId: "967930479548",
  appId: "1:967930479548:web:c3ea79712eb65beac061b9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
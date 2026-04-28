
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ai-mock-interview-platfo-48718.firebaseapp.com",
  projectId: "ai-mock-interview-platfo-48718",
  storageBucket: "ai-mock-interview-platfo-48718.firebasestorage.app",
  messagingSenderId: "1020231344043",
  appId: "1:1020231344043:web:d9b3a3bf2b4a3a08b97cee"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}
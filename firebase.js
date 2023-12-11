import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqraDAcpkDrr-Qxx_T6aNH-wVZsnbEZoo",
  authDomain: "smoke-c6a3e.firebaseapp.com",
  projectId: "smoke-c6a3e",
  storageBucket: "smoke-c6a3e.appspot.com",
  messagingSenderId: "624680627943",
  appId: "1:624680627943:web:ee866681f720b613683c42",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);

export { app, db, auth };

import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAdcI7sZdvDEevuJmn87XeHs8XK4bNzdig",
  authDomain: "alzhietech.firebaseapp.com",
  projectId: "alzhietech",
  storageBucket: "alzhietech.appspot.com",
  messagingSenderId: "80440733140",
  appId: "1:80440733140:web:110de167757df0b8897a41",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { app, database };

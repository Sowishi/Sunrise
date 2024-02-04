import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBgt9w5juZPEGy7idwEcQCjQsnmi5LSSrA",
  authDomain: "sinfero-vphs.firebaseapp.com",
  databaseURL:
    "https://sinfero-vphs-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sinfero-vphs",
  storageBucket: "sinfero-vphs.appspot.com",
  messagingSenderId: "885902784733",
  appId: "1:885902784733:web:0906f4fd9179b5ae040334",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { app, database };

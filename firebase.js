import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";

// Change this config base on your porject

const firebaseConfig = {
  apiKey: "AIzaSyDNK7AEomWt080xm98QJSAUKHZkzki1q9I",
  authDomain: "sunrise-738e6.firebaseapp.com",
  projectId: "sunrise-738e6",
  storageBucket: "sunrise-738e6.appspot.com",
  messagingSenderId: "1044404750102",
  appId: "1:1044404750102:web:57c1092f45575ac884b237",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { app, database };

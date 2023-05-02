import { initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCz5O65iZXb_NGzBRdWD-DSuKR0azrDb_g",
  authDomain: "superlaco.firebaseapp.com",
  projectId: "superlaco",
  storageBucket: "superlaco.appspot.com",
  messagingSenderId: "301957868701",
  appId: "1:301957868701:web:53960d44bd6fbfcb623874"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore()

export {app, db}
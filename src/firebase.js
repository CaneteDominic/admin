import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDZyuteDwG6G1N5xfqvJzCTCUX_jHM9x8o",
  authDomain: "smartposture-a2269.firebaseapp.com",
  databaseURL: "https://smartposture-a2269-default-rtdb.firebaseio.com",
  projectId: "smartposture-a2269",
  storageBucket: "smartposture-a2269.appspot.com",
  messagingSenderId: "530813006595",
  appId: "1:530813006595:web:472a3fff248fc435da2f36"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database, ref, get};
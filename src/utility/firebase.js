import firebase from "firebase/compat/app";
//authentication
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsHEVPGMBkJF88gy020a900axRgPGgDHU",
  authDomain: "saris-paris.firebaseapp.com",
  projectId: "saris-paris",
  storageBucket: "saris-paris.appspot.com",
  messagingSenderId: "534314086238",
  appId: "1:534314086238:web:f512d6f4dde3f4584de9cf",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();

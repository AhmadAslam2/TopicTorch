
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAoBpChYKv8o-GygQEaLeBrPnwWXpu8rcM",
  authDomain: "topictorch-57ec4.firebaseapp.com",
  projectId: "topictorch-57ec4",
  storageBucket: "topictorch-57ec4.appspot.com",
  messagingSenderId: "377704649113",
  appId: "1:377704649113:web:1a9720493ab527e0ca8308",
  measurementId: "G-ZVTLJBJWQM"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getFirestore(app)
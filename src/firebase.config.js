import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDeZbcf3bBdO3iATWnorfnEPKCPjTRocZI",
  authDomain: "sic-db-53c2a.firebaseapp.com",
  projectId: "sic-db-53c2a",
  storageBucket: "sic-db-53c2a.appspot.com",
  messagingSenderId: "122514351199",
  appId: "1:122514351199:web:42d59db75f77756376a7ea",
  measurementId: "G-CKLD3S22GJ",

};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


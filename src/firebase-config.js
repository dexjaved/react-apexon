import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-YXOrhXBuO9Nv3ZRe2QhbhUiGspN_AR8",
  authDomain: "employee-36378.firebaseapp.com",
  projectId: "employee-36378",
  storageBucket: "employee-36378.appspot.com",
  messagingSenderId: "1017080312859",
  appId: "1:1017080312859:web:fa46d2aefe2dd62845b4be"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

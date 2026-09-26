import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdkOGMWz2hl7cTRXaUxySUBEwdskzBfvA",
  authDomain: "lumex-digital-admin.firebaseapp.com",
  projectId: "lumex-digital-admin",
  storageBucket: "lumex-digital-admin.firebasestorage.app",
  messagingSenderId: "886698454544",
  appId: "1:886698454544:web:05713fceef5959e54a2495",
  measurementId: "G-DK7GQQZCJK",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

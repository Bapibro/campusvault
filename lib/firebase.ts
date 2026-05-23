import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPIuef9zEAdl7mvRkdwHEMmbh8gerdIEE",
  authDomain: "campusvault-24810.firebaseapp.com",
  projectId: "campusvault-24810",
  storageBucket: "campusvault-24810.firebasestorage.app",
  messagingSenderId: "277792662356",
  appId: "1:277792662356:web:6711c368ab815b44a95ec1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
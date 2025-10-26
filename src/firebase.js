import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/*
  Inserted firebase config (from user):
*/
const firebaseConfig = {
  apiKey: "AIzaSyC0uEPWheoVsVjLL9uQ1fZcHbVrYNP7X14",
  authDomain: "monkecord-9f5a8.firebaseapp.com",
  projectId: "monkecord-9f5a8",
  storageBucket: "monkecord-9f5a8.firebasestorage.app",
  messagingSenderId: "593937322531",
  appId: "1:593937322531:web:54fa3dab92dee03138d796",
  measurementId: "G-522LPS7EM4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

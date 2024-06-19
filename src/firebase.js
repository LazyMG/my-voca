// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmlx6CqpCJFSsePXq5EovXVHPjWLsG5W8",
  authDomain: "my-voca-947ab.firebaseapp.com",
  projectId: "my-voca-947ab",
  storageBucket: "my-voca-947ab.appspot.com",
  messagingSenderId: "818844357064",
  appId: "1:818844357064:web:4c38d9996c6aa0066470fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);

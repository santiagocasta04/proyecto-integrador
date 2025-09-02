// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSi9KRKp0hqH9B-CNW9455dUZemZ-83io",
  authDomain: "liverlab3d.firebaseapp.com",
  projectId: "liverlab3d",
  storageBucket: "liverlab3d.firebasestorage.app",
  messagingSenderId: "917095813633",
  appId: "1:917095813633:web:b45600163efdbb8bd66600"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
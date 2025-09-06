// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPsHAUBz30r_T5whtLZNGVmbu0I4pG-Pw",
  authDomain: "klickshare-65538.firebaseapp.com",
  projectId: "klickshare-65538",
  storageBucket: "klickshare-65538.firebasestorage.app",
  messagingSenderId: "810321462770",
  appId: "1:810321462770:web:35c058a3e32ab695a7976b",
  measurementId: "G-Z63VWXGBES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
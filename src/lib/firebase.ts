// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANf9fW2VgP5bwNM6niduK37td2EKWzVEI",
  authDomain: "hotel-dashboard-7f6a0.firebaseapp.com",
  projectId: "hotel-dashboard-7f6a0",
  storageBucket: "hotel-dashboard-7f6a0.appspot.com",
  messagingSenderId: "563709584374",
  appId: "1:563709584374:web:c8573446d6e2dc22a91dd7",
  measurementId: "G-3KCFN78DZX"
};

export const app = initializeApp(firebaseConfig);

export const Providers = {
  google: new firebase.auth.GoogleAuthProvider()
}




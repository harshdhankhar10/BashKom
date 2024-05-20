// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0mNtTagd7iNYqFfsK24l2364VJy5ImyE",
  authDomain: "bashkom---ecommerce.firebaseapp.com",
  projectId: "bashkom---ecommerce",
  storageBucket: "bashkom---ecommerce.appspot.com",
  messagingSenderId: "1083353593749",
  appId: "1:1083353593749:web:0983c4a1f4c565f9a8a89c",
  measurementId: "G-FD3P4YCDXJ", 
  databaseURL : "https://bashkom---ecommerce-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

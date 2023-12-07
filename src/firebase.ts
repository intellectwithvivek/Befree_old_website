// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuQcGgrsSKT5B5ic9MIxQ7t0-ZcMLlTdA",
  authDomain: "befree-prod.firebaseapp.com",
  databaseURL: "https://befree-prod-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "befree-prod",
  storageBucket: "befree-prod.appspot.com",
  messagingSenderId: "833331411230",
  appId: "1:833331411230:web:269c4336f914877417f10f",
  measurementId: "G-QTH32N6TML"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const  auth = getAuth(app);

export const db =  getFirestore(app);
export const storage = getStorage(app)

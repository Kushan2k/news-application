// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1UEXJwro799_tml1rlub04I41KeFGtxA",
  authDomain: "news-app-7d188.firebaseapp.com",
  projectId: "news-app-7d188",
  storageBucket: "news-app-7d188.appspot.com",
  messagingSenderId: "96114946264",
  appId: "1:96114946264:web:24503bee20556e2759e7ad",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const firestore = getFirestore(app)

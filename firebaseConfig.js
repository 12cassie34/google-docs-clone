// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpplN_b469fHMEgksQSK9LjJuXPTR5208",
  authDomain: "docs-clone-23366.firebaseapp.com",
  projectId: "docs-clone-23366",
  storageBucket: "docs-clone-23366.appspot.com",
  messagingSenderId: "180277309977",
  appId: "1:180277309977:web:293b240030c4a0f1e8b088"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
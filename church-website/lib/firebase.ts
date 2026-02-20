// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // We will use this later for Admin
import { getStorage } from "firebase/storage"; // We will use this later for Images

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBi8gJIaMm0Ifzz9Tq4YtqJaZhX_bPGWpw",
    authDomain: "p61-smartfarm.firebaseapp.com",
    projectId: "p61-smartfarm",
    storageBucket: "p61-smartfarm.firebasestorage.app",
    messagingSenderId: "533609614738",
    appId: "1:533609614738:web:0f2dbdc7481f9e7d78854b",
    measurementId: "G-49B4M560K5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); 

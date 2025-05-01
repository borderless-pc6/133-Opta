import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0IPEOtyc3xTh473tSgQPGxNV0B6PyZB4",
    authDomain: "opta-94668.firebaseapp.com",
    projectId: "opta-94668",
    storageBucket: "opta-94668.firebasestorage.app",
    messagingSenderId: "1034841539122",
    appId: "1:1034841539122:web:f82bf7995b4685e212722b",
    measurementId: "G-KB0J774QCE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };
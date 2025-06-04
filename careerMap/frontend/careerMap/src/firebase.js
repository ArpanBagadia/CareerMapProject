import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDekZ7pX3ZK8tzZMaS6ORDtT-1hHTKLjDo",
    authDomain: "careermap-d247a.firebaseapp.com",
    projectId: "careermap-d247a",
    storageBucket: "careermap-d247a.firebasestorage.app",
    messagingSenderId: "755820495438",
    appId: "1:755820495438:web:77324bc8fd66f385ccf91f",
    measurementId: "G-23NNL9R4CN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };

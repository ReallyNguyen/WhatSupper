// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCc4srK9mwG4mFJKkwYpFNS3QRwpgI0O1g",
    authDomain: "whatsupper-4cf11.firebaseapp.com",
    projectId: "whatsupper-4cf11",
    storageBucket: "whatsupper-4cf11.appspot.com",
    messagingSenderId: "288108036787",
    appId: "1:288108036787:web:1d7116345218340d0fa6c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
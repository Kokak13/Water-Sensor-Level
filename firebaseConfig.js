import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyASwrdNFn2lZ-VAtceull4anWpM-iDGjD4",
  authDomain: "firebsemod.firebaseapp.com",
  databaseURL: "https://firebsemod-default-rtdb.firebaseio.com",
  projectId: "firebsemod",
  storageBucket: "firebsemod.firebasestorage.app", 
  messagingSenderId: "829280611969",
  appId: "1:829280611969:web:ab7f54d8cd71342c71a780",
  measurementId: "G-WLK7K748CC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const rtdb = getDatabase(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth, db, rtdb };

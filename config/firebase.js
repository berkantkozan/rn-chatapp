import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB0Vs5_ifKnSQX5QI1nNSGXRLUyjLKcM8w",
  authDomain: "rn-chatapp-b47b1.firebaseapp.com",
  projectId: "rn-chatapp-b47b1",
  storageBucket: "rn-chatapp-b47b1.appspot.com",
  messagingSenderId: "77947247037",
  appId: "1:77947247037:web:54d3ae4e43d88dd955dad4"
};
// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
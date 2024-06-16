import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDQNtxlLe4u4p4hdz65MjAzOw6K0wxIrIk",
  authDomain: "movie-app-f0a46.firebaseapp.com",
  projectId: "movie-app-f0a46",
  storageBucket: "movie-app-f0a46.appspot.com",
  messagingSenderId: "322975969505",
  appId: "1:322975969505:web:b7cd7ebd65fd50ad5147a0",
  measurementId: "G-CWWZNHTGGG"
};
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const firebaseAuth = getAuth(app);
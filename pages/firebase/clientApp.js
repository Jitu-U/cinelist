import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

/*const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};*/

const clientCredentials = {
  apiKey: "AIzaSyCz_OxvLEq7h653SMPLS11RZA80C_Dlt00",
  authDomain: "cinelist-j.firebaseapp.com",
  projectId: "cinelist-j",
  storageBucket: "cinelist-j.appspot.com",
  messagingSenderId: "757820652676",
  appId: "1:757820652676:web:1df76cee21c3d4d3d596d1",
  measurementId: "G-JQ0LS4346W"
};

const app = initializeApp(clientCredentials);


export default app;

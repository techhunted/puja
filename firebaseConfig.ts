import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_0pxd6FYZYAV00UcS-uTJZIly3d9YOr4",
  authDomain: "neaupanepujapasal-e0212.firebaseapp.com",
  databaseURL: "https://neaupanepujapasal-e0212-default-rtdb.firebaseio.com",
  projectId: "neaupanepujapasal-e0212",
  storageBucket: "neaupanepujapasal-e0212.firebasestorage.app",
  messagingSenderId: "1089550022144",
  appId: "1:1089550022144:web:ff11bd37b01f32cfa64ae5"
};

let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  console.log("Firebase initialized successfully");
} catch (e) {
  console.warn("Firebase initialization failed, falling back to local storage mode", e);
}

export { auth, db };
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGAFwnEzrMGBmQK97l_gAxMfnJGcgdSWQ",
  authDomain: "e-commerce-a5795.firebaseapp.com",
  projectId: "e-commerce-a5795",
  storageBucket: "e-commerce-a5795.appspot.com",
  messagingSenderId: "905918732767",
  appId: "1:905918732767:web:d8cf347c62aca4c570cc6a",
  measurementId: "G-MV2YRS88PW",
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account ",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signOutFromGoogle = () => {
  auth.signOut();
};
export const db = getFirestore(firebaseApp);

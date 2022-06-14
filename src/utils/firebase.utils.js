import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_sV8tPAeUfeLvwCJ0nI24-oDqyHnbDGM",
  authDomain: "crwn-clothing-db-aef44.firebaseapp.com",
  projectId: "crwn-clothing-db-aef44",
  storageBucket: "crwn-clothing-db-aef44.appspot.com",
  messagingSenderId: "808422136040",
  appId: "1:808422136040:web:80177571c2ad6d374b915d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); 

provider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
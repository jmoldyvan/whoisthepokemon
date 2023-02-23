import firebase from 'firebase';
import { initializeApp } from "firebase/app";

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5yB55tvAipUTSuf1XON5ZmdF-Boio-Tc",
  authDomain: "pokemonauth-86947.firebaseapp.com",
  projectId: "pokemonauth-86947",
  storageBucket: "pokemonauth-86947.appspot.com",
  messagingSenderId: "973732951440",
  appId: "1:973732951440:web:20324c6a3e322d20026f15"
};

// try {
//     firebase.initializeApp(firebaseConfig);
//   } catch (err) {
//     if (!/already exists/.test(err.message)) {
//       console.error('Firebase initialization error', err.stack);
//     }
//   }

//   const Fire = firebase;


  const fire = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
const auth = firebase.auth();

  export default { fire, db, auth };
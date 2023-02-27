import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB5yB55tvAipUTSuf1XON5ZmdF-Boio-Tc",
  authDomain: "pokemonauth-86947.firebaseapp.com",
  projectId: "pokemonauth-86947",
  storageBucket: "pokemonauth-86947.appspot.com",
  messagingSenderId: "973732951440",
  appId: "1:973732951440:web:20324c6a3e322d20026f15"
};


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default auth;
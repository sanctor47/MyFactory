import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbOiIuKsgSH2d2fbTSPIV5RxP3XGEFCoc",
  authDomain: "vacuumformer-e942f.firebaseapp.com",
  databaseURL: "https://vacuumformer-e942f-default-rtdb.firebaseio.com",
  projectId: "vacuumformer-e942f",
  storageBucket: "vacuumformer-e942f.appspot.com",
  messagingSenderId: "923785843671",
  appId: "1:923785843671:web:2cd2a2a0b6b7d514207192",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

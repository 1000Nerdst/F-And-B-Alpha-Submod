//import * as firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyA_m-Cntfs1VUOFzCg_scngg2eelbcPGPY",
  authDomain: "fareandbalanced-alpha.firebaseapp.com",
  databaseURL: "https://fareandbalanced-alpha-default-rtdb.firebaseio.com",
  projectId: "fareandbalanced-alpha",
  storageBucket: "fareandbalanced-alpha.appspot.com",
  messagingSenderId: "870391492699",
  appId: "1:870391492699:web:70a2494ccaba71d007cf7e",
  measurementId: "G-9RN5GKJDRR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// const db = firebase.Firestore();
// db.settings({timestampInSnapshots: true});

export const db = initializeApp(firebaseConfig).firestore

export const createUser = userInfo =>{
  const cUser = userInfo.uid
  const docRef = setDoc(doc(db, 'userInfo', cUser), userInfo);
  return docRef
}

//make an update fuctions

//make a delete function

//make a load users hook

export default auth
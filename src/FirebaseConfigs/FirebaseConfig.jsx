import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'; // for storage


const firebaseConfig = {
  apiKey: "AIzaSyBw6AR1BqGGWAMkntBDULmaCOAJ_Iux9PE",
  authDomain: "shopcoder-8ab74.firebaseapp.com",
  databaseURL: "https://shopcoder-8ab74-default-rtdb.firebaseio.com",
  projectId: "shopcoder-8ab74",
  storageBucket: "shopcoder-8ab74.appspot.com",
  messagingSenderId: "45664403677",
  appId: "1:45664403677:web:1b9fbad38d3e87b9821b34"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);  

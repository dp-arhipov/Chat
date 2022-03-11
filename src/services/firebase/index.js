import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {FirebaseAuth, FirebaseDB} from "./API";
import {config} from "./config";


const app = initializeApp(config);
const firestore = getFirestore(app);
const auth = getAuth();

export const Auth = new FirebaseAuth(auth);
export const DB = new FirebaseDB(app, firestore);

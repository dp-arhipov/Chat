import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, setPersistence, browserSessionPersistence} from "firebase/auth";
import {FirebaseAuth, FirebaseDB} from "./firebaseAPI";
import {useSelector} from "react-redux";
import * as selectors from "../store/selectors";

const firebaseConfig = {
    apiKey: "AIzaSyCVwzZ5D0PyOuiAdr2QKbtErjYOTZD4uws",
    authDomain: "chat-3-bcf80.firebaseapp.com",
    projectId: "chat-3-bcf80",
    storageBucket: "chat-3-bcf80.appspot.com",
    messagingSenderId: "372676514129",
    appId: "1:372676514129:web:55e7de9173144b5193c370"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();
//setPersistence(auth, browserSessionPersistence); //сохранить токен в браузере

export const Auth = new FirebaseAuth(auth);
export const DB = new FirebaseDB(app, firestore);

import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {FirebaseAuth, FirebaseDB} from "./firebaseAPI";
import {useSelector} from "react-redux";
import * as selectors from "../store/selectors";

const firebaseConfig = {
    apiKey: "AIzaSyDDgdMfwVDWoblWGD6EGn_b2-aUP9sD-tI",
    authDomain: "chat-2-cf0e6.firebaseapp.com",
    projectId: "chat-2-cf0e6",
    storageBucket: "chat-2-cf0e6.appspot.com",
    messagingSenderId: "164607313968",
    appId: "1:164607313968:web:0861de31a4521df2b645f5"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();

export const Auth = new FirebaseAuth(auth);
export const DB = new FirebaseDB(app, firestore);

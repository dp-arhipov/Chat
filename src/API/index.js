import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {FirebaseAuth, FirebaseDB} from "./firebaseAPI";

const firebaseConfig = {
    apiKey: "AIzaSyDmB2BUfUuAaQQ3qxjOz8dKCk9big-TcUs",
    authDomain: "chat-4-e32f2.firebaseapp.com",
    projectId: "chat-4-e32f2",
    storageBucket: "chat-4-e32f2.appspot.com",
    messagingSenderId: "113749571947",
    appId: "1:113749571947:web:32766f39ad4317981fb42e"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();

export const Auth = new FirebaseAuth(auth);
export const DB = new FirebaseDB(app, firestore);

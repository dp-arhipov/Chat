import React, {useContext} from 'react';
import {AuthContext} from "../context";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {collection, doc, setDoc} from "firebase/firestore";
import {Button} from "react-bootstrap";
import {useAuthState} from "react-firebase-hooks/auth";


const Login = () => {
    const {auth} = useContext(AuthContext);
    const {firestore} = useContext(AuthContext);

    const buttonHandler = async () => {
        const provider = new GoogleAuthProvider();
        const {user} = await signInWithPopup(auth, provider);

        const docRef = doc(collection(firestore, "users"), user.uid);
        setDoc(docRef, {
            name: user.displayName,
            dialogs: {}
        }, {merge: true});


    }


    return (
        <div>
            <Button onClick={buttonHandler}>Логин</Button>
        </div>
    );
};

export default Login;
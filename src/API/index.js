import {initializeApp} from 'firebase/app';
import {arrayUnion, collection, doc, getDocs, getFirestore, setDoc, serverTimestamp, updateDoc} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";

import {nanoid} from 'nanoid'

const firebaseConfig = {
    apiKey: "AIzaSyD2BU7gYSyAqQVjqVWpfPS0Tm2G9eEBQ5Y",
    authDomain: "chat-2b90b.firebaseapp.com",
    projectId: "chat-2b90b",
    storageBucket: "chat-2b90b.appspot.com",
    messagingSenderId: "910644473265",
    appId: "1:910644473265:web:d580b75d98257c3e17e190"
};

// const ref = (partner, currentUser, dialogID) => {
//     dialogInfo:"",
//         dialogList:"",
//         dialogData:""
// }


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();

export const logIn = async () => {
    const provider = new GoogleAuthProvider();
    const {user} = await signInWithPopup(auth, provider);

    const docRef2 = doc(collection(firestore, "Users"), user.uid);
    setDoc(docRef2, {
        name: user.displayName
    }, {merge: true});

    return user;
}

// export const setup = (user) => {
//     let dialogID = nanoid(8);
//     const docRef2 = doc(firestore, "usersData", user.id, "dialogsInfo", dialogID);
//     setDoc(docRef2, {chatMemberId: "y0PPDWFRMxhaMBE19eYcS2koLSB3", name: "Alex Suuper"});
// }

export const logOut = () => {
    signOut(auth);
}

export const useCurrentUser = () => {

    const user = useAuthState(auth);
    const isLoggedIn = (user[0] != null) ? true : false;
    if (isLoggedIn) {
        return {
            allInfo: user,
            name: user[0].displayName,
            id: user[0].uid,
            isLoggedIn: isLoggedIn
        }
    } else {
        return {
            isLoggedIn: isLoggedIn
        }
    }
}


export const getUsers = async () => {
    const querySnapshot = await getDocs(collection(firestore, "Users"));
    let userList = [];
    if (querySnapshot) {
        querySnapshot.forEach((doc) => {
            userList.push({id: doc.id, name: doc.data().name});
        });
    }
    return userList
}


//
export const getDialogList = async (userId) => {
    let dialogList = [];
    //const docs = await getDocs(collection(firestore, "usersData", userId, "dialogsInfo"));
    const docs = await getDocs(collection(firestore, "Users", userId, "dialogList"));

    if (docs) {
        docs.forEach((doc) => {
            dialogList.push({id: doc.id, name: doc.data().dialogName});
        });
    }
    return dialogList;
}

const dialogExists = async (member, currentUser) => {
    const docRef = collection(firestore, "Users", currentUser.id, "dialogList");
    const docs = await getDocs(docRef);
    let dialogID = undefined;
    docs.forEach((document) => {
        if (document.data().chatMemberId == member.id) {
            dialogID = document.id;
        }
    });
    return (dialogID) ? dialogID : false;

}

export const createDialogWith = async (user, currentUser) => {
    let dialogId = await dialogExists(user, currentUser);
    if (!dialogId) {
        dialogId = nanoid(8);
        const docRef1 = doc(firestore, "Users", currentUser.id, "dialogList", dialogId);
        setDoc(docRef1, {dialogName: user.name, chatMemberId: user.id}, {merge: true});

        const docRef2 = doc(collection(firestore, "Dialogs", dialogId, "info"));
        setDoc(docRef2, {dialogName: user.name, chatMemberId: user.id, dialogCreatorId: currentUser.id});

        const docRef4 = doc(firestore, "Users", user.id, "dialogList", dialogId);
        setDoc(docRef4, {dialogName: currentUser.name, chatMemberId: currentUser.id}, {merge: true});
    }
    return dialogId;

}

export const sendMessage = async (user, dialog, text) => {

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const message = {
        id: user.id,
        text: text,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString()
    }
    // const docRef = doc(collection(firestore, "Dialogs", dialog.id, "data"), "messages");
    // setDoc(docRef, {"messages":arrayUnion(message)}, { merge: true });
    //
    const docRef = doc(collection(firestore, "Dialogs", dialog.id, "data"), date+" "+time );
    setDoc(docRef, message, { merge: true });



}
//
export const getDialogMessages = async (user, dialog) => {
    let messages = [];
    const docRef22 = collection(firestore, "Dialogs", dialog.id, "data");
    const docSnap = await getDocs(docRef22);
    if (docSnap) {
        for (let item of docSnap.docs) {
            messages = [...messages, item.data()];
        }
    }
    console.log(messages);
    return messages;

}


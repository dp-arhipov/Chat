import * as DB from "./DB";

import {initializeApp} from 'firebase/app';
import {collection, doc, getFirestore, setDoc,arrayUnion,updateDoc, getDoc, getDocs, listDocuments} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD2BU7gYSyAqQVjqVWpfPS0Tm2G9eEBQ5Y",
    authDomain: "chat-2b90b.firebaseapp.com",
    projectId: "chat-2b90b",
    storageBucket: "chat-2b90b.appspot.com",
    messagingSenderId: "910644473265",
    appId: "1:910644473265:web:d580b75d98257c3e17e190"
};

const app = initializeApp({
    apiKey: "AIzaSyD2BU7gYSyAqQVjqVWpfPS0Tm2G9eEBQ5Y",
    authDomain: "chat-2b90b.firebaseapp.com",
    projectId: "chat-2b90b",
    storageBucket: "chat-2b90b.appspot.com",
    messagingSenderId: "910644473265",
    appId: "1:910644473265:web:d580b75d98257c3e17e190"
});


const firestore = getFirestore(app);
const auth = getAuth();


// export const getMessages = (dialogId) => {
//
//     let messages = DB.messages.filter(message => message.dialogId == dialogId);
//     messages = messages[0].messages;
//     return messages;
// }

export const getDialogs = () => {
    return DB.dialogs;

}

export const logIn = async () => {
    const provider = new GoogleAuthProvider();
    const {user} = await signInWithPopup(auth, provider);
    const docRef = doc(collection(firestore, "users"), user.uid);
    setDoc(docRef, {
        name: user.displayName,
        dialogs: {}
    }, {merge: true});

    return user;
}


export const logOut = () => {
    signOut(auth);
}

export const useCurrentUser = () => {
    const user = useAuthState(auth);
    const isLoggedIn = (user[0] != null) ? true : false;
    if(isLoggedIn) {
        return {
            allInfo: user,
            name: user[0].displayName,
            id: user[0].uid,
            isLoggedIn: isLoggedIn
        }
    }
    else {
        return {
            isLoggedIn: isLoggedIn
        }
    }
}

//
// export const sendMessage = async (userID, dialogID, text) => {
//     const docRef = doc(firestore, "users", userID, "dialogs", dialogID);
//     await updateDoc(docRef, {
//         messages: arrayUnion(text)
//     });
// }
// //
// export const getDialogMessages = async (userID, dialogID) => {
//     const docRef = doc(firestore, "users", userID, "dialogs", dialogID);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//         return docSnap.data().messages;
//     } else {
//         return false;
//     }
// }

export const sendMessage = async (userID, dialogID, text) => {
    const docRef = doc(firestore, "users", userID, "messages", dialogID,  );
    await updateDoc(docRef, {
        [userID]: arrayUnion(text)
    });
}
//
export const getDialogMessages = async (userID, dialogID) => {
    const docRef = doc(firestore, "users", userID, "messages", dialogID);
    const docSnap = await getDoc(docRef);
    const dataObj = docSnap.data();
    const idArray = Object.keys(dataObj);
let messages = [];
    idArray.map(item=>{
        //console.log(dataObj[item]);
        for (let key in dataObj[item]) {
            messages = [...messages, dataObj[item][key]];
        }

    })
    //console.log(messages);


    if (docSnap.exists()) {
        return messages;
    } else {
        return false;
    }
}



//
export const getDialogList = async (userId) => {
    let dialogList=[];
    const querySnapshot = await getDocs(collection(firestore, "users", userId, "dialogs"));
    querySnapshot.forEach((doc) => {
        dialogList.push({id: doc.id,name: doc.data().name});
    });
    return dialogList;
}

// dialogList
// currentDialog
// currentUser
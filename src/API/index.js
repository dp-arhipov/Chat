import {initializeApp} from 'firebase/app';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc
} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";

import {nanoid} from 'nanoid'
import {store} from '../store'





// const refs ={
//
//     const docRef = collection(firestore, "Dialogs", dialog.id, "data");
//     const docRef = doc(collection(firestore, "Dialogs", dialog.id, "data"), date + " " + time);
//     const docRef2 = doc(collection(firestore, "Dialogs", dialogId, "info"));
//
//     const docRef1 = doc(firestore, "Users", currentUser.id, "dialogList", dialogId);
//     const docRef = collection(firestore, "Users", currentUser.id, "dialogList");
//     const docRef = collection(firestore, "Users", userId, "dialogList");
//     const docRef = collection(firestore, "Users");
//     const docRef = doc(firestore, "Users", user.id);
//     const docRef = doc(collection(firestore, "Users"), user.uid);
//     const docRef4 = doc(firestore, "Users", user.id, "dialogList", dialogId);
// }

class FirebaseAuth {
    hh = 0;

    constructor(auth) { // конструктор

        this.auth = auth;

    }

    googleLogin = async () => {
        const googleProvider = new GoogleAuthProvider();
        const {user} = await signInWithPopup(this.auth, googleProvider);

        return user;

    }

    logOut = async () => {
        signOut(this.auth);
    }
    getCurrentUser = () => {
        return this.user;
    }

}

class FirebaseDB {
    constructor(app, firestore) {
        this.app = app;
        this.firestore = firestore;
    }

    createUser = async (userId, userName) => {
        let nickName = "user_" + nanoid(8);
        const userInfo = {
            name: userName,
            id: userId,
            nickName: nickName
        }

        const docRef = doc(collection(this.firestore, "Users"), userId);
        const document = await getDoc(docRef);

        if (!document.exists()) {
            setDoc(docRef, {
                name: userName,
                nickName: nickName
            }, {merge: true});
        }
        return userInfo;
    }

    sendMessage = (senderId, dialogId, text) => {

        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        const message = {
            id: senderId,
            text: text,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString(),
            timestamp: serverTimestamp()
        }

        const docRef = doc(collection(this.firestore, "Dialogs", dialogId, "data"), date + " " + time);
        //console.log(dialogId);
        setDoc(docRef, message, {merge: true});

    }

    getDialogMessages = async (dialogId) => {
        let messages = [];
        const docRef = collection(this.firestore, "Dialogs", dialogId, "data");
        const q = query(docRef, orderBy("timestamp"))
        const docSnap = await getDocs(q);
        if (docSnap) {
            for (let item of docSnap.docs) {
                messages = [...messages, item.data()];
            }
        }
        return messages;
    }

    getCurrentUserDialogs = async (userId) => {
        let dialogList = [];
        //const docs = await getDocs(collection(firestore, "usersData", userId, "dialogsInfo"));
        const docs = await getDocs(collection(this.firestore, "Users", userId, "dialogList"));

        if (docs) {
            docs.forEach((doc) => {
                dialogList.push({id: doc.id, name: doc.data().dialogName});
            });
        }
        return dialogList;
    }

    dialogExists = async (memberId, currentUserId) => {
        const docRef = collection(this.firestore, "Users", currentUserId, "dialogList");
        const docs = await getDocs(docRef);
        let dialogID = undefined;
        docs.forEach((document) => {
            if (document.data().chatMemberId == memberId) {
                dialogID = document.id;
            }
        });
        return (dialogID) ? dialogID : false;

    }

    createDialog = async (member, currentUser) => {

        const dialogId = nanoid(8);
        const docRef1 = doc(this.firestore, "Users", currentUser.id, "dialogList", dialogId);
        setDoc(docRef1, {dialogName: member.name, chatMemberId: member.id}, {merge: true});

        const docRef4 = doc(this.firestore, "Users", member.id, "dialogList", dialogId);
        setDoc(docRef4, {dialogName: currentUser.name, chatMemberId: currentUser.id}, {merge: true});

        const docRef2 = doc(collection(this.firestore, "Dialogs", dialogId, "info"));
        setDoc(docRef2, {dialogName: member.name, chatMemberId: member.id, dialogCreatorId: currentUser.id});

        return dialogId;

    }

    findUserByNickName = async (nickName) => {
        let user = false;
        const docRef = collection(this.firestore, "Users");
        const docs = await getDocs(docRef);
        docs.forEach((doc) => {
            if (doc.data().nickName == nickName) {
                user = {id: doc.id, name: doc.data().name}
            }
            ;
        });
        return user;
    }

    findUserById = async (userId) => {
        let user = false;
        const docRef = collection(this.firestore, "Users");
        const docs = await getDocs(docRef);
        docs.forEach((doc) => {
            if (doc.id == userId) {
                user = {id: doc.id, name: doc.data().name}
            }
            ;
        });
        return user;
    }


    setNickName = async (nickName, userId) => {
        const docRef = doc(this.firestore, "Users", userId);
        updateDoc(docRef, {nickName: nickName});
    }

}

const firebaseConfig = {
    apiKey: "AIzaSyD2BU7gYSyAqQVjqVWpfPS0Tm2G9eEBQ5Y",
    authDomain: "chat-2b90b.firebaseapp.com",
    projectId: "chat-2b90b",
    storageBucket: "chat-2b90b.appspot.com",
    messagingSenderId: "910644473265",
    appId: "1:910644473265:web:d580b75d98257c3e17e190"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();

const Auth = new FirebaseAuth(auth);
const DB = new FirebaseDB(app, firestore);




export const logIn = async () => {
    let user = await Auth.googleLogin();
    user = await DB.createUser(user.uid, user.displayName);
    store.dispatch({type: 'SET_CURRENT_USER', payload: user})
}


export const logOut = () => {
    Auth.logOut();
    store.dispatch({type: 'LOGOUT', payload: false})
}

export const sendMessage = (text, senderId = store.getState().currentUser.id, dialogId = store.getState().currentDialog.id) => {
    DB.sendMessage(senderId, dialogId, text);

    const now = new Date();
    const message = {
        id: senderId,
        text: text,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString()
    }
    store.dispatch({type: 'ADD_MESSAGE', payload: message})

}

export const setDialogMessages = async (dialogId) => {
    const messages = await DB.getDialogMessages(dialogId);
    store.dispatch({type: 'SET_MESSAGES', payload: messages})
}


export const changeNickName = async (nickName) => {
    DB.setNickName(nickName, store.getState().currentUser.id);
    store.dispatch({type: 'SET_NICK_NAME', payload: nickName})
}

export const find = async (text) => {
    let user = await DB.findUserByNickName(text);
    store.dispatch({type: 'SET_FIND_RESULTS', payload: user})
    console.log(store.getState())
    return user;
}

export const setCurrentDialog = async (dialogId) => {
    store.dispatch({type: 'SET_CURRENT_DIALOG', payload: dialogId});
    await setDialogMessages(dialogId);

}

export const setDialogList = async (userId = store.getState().currentUser.id) => {
    const dialogList = await DB.getCurrentUserDialogs(userId)
    store.dispatch({type: 'SET_DIALOG_LIST', payload: dialogList})

}


export const createDialogWith = async (member = store.getState().findResults.user, currentUser = store.getState().currentUser) => {

    let dialogId = await DB.dialogExists(member.id, currentUser.id);

    if (!dialogId) {
        dialogId = await DB.createDialog(member, currentUser);
    }
    await setDialogList();
    setCurrentDialog(dialogId);


}

export const initDialog = async () => {
    await setDialogList(store.getState().currentUser.id);
    if(store.getState().dialogList.length!=0) await setCurrentDialog(store.getState().dialogList[0].id)
}




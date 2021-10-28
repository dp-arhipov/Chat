import {initializeApp} from 'firebase/app';
import {arrayUnion, collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc} from 'firebase/firestore';
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


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();

export const logIn = async () => {
    const provider = new GoogleAuthProvider();
    const {user} = await signInWithPopup(auth, provider);

    const docRef2 = doc(collection(firestore, "usersInfo"), user.uid);
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
    const querySnapshot = await getDocs(collection(firestore, "usersInfo"));
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
    const docs = await getDocs(collection(firestore, "dialogsInfo"));
    if (docs) {
        docs.forEach((doc) => {
            dialogList.push({id: doc.id, name: doc.data().dialogName});
        });
    }
    return dialogList;
}

export const createDialogWith = async (user, currentUser) => {
    let dialogID = nanoid(8);
    //const docRef = collection(firestore, "usersData", currentUser.id, "dialogsInfo");
    const docRef = collection(firestore, "dialogsInfo");
    const docs = await getDocs(docRef);


    docs.forEach((document) => {
        if (document.data().chatMemberId == user.id) {
            dialogID = document.id;
            return dialogID;
        }
    });


    //const docRef3 = doc(firestore, "usersData", currentUser.id, "dialogsData", dialogID);
    const docRef3 = doc(firestore, "dialogsData", dialogID);
    setDoc(docRef3, {});
    //const docRef2 = doc(firestore, "usersData", currentUser.id, "dialogsInfo", dialogID);
    const docRef2 = doc(firestore, "dialogsInfo", dialogID);
    setDoc(docRef2, {chatMemberId: user.id, dialogName: user.name, dialogCreatorId: currentUser.id});

    const docRef6 = doc(firestore, "usersInfo", user.id, "dialogList", dialogID);
    //!!!имя диалога у каждого юзера своё, переделать
    setDoc(docRef6, {dialogName: user.name}, {merge: true});
    return dialogID;

}

export const sendMessage = async (userID, dialogID, text) => {
    // const docRef = doc(firestore, "usersData", userID, "dialogsData", dialogID);
    const docRef = doc(firestore, "dialogsData", dialogID);
    await updateDoc(docRef, {
        [userID]: arrayUnion(text)
    });
}
//
export const getDialogMessages = async (userID, dialogID) => {
    //const docRef = doc(firestore, "usersData", userID, "dialogsData", dialogID);
    const docRef = doc(firestore, "dialogsData", dialogID);
    const docSnap = await getDoc(docRef);
    const dataObj = docSnap.data();
    const idArray = Object.keys(dataObj);
    let messages = [];
    idArray.map(item => {
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


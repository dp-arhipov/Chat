import {GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import {collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc} from "firebase/firestore";
import {nanoid} from "nanoid";

export class FirebaseAuth {

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

export class FirebaseDB {
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

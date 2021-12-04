import {GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc
} from "firebase/firestore";
import {nanoid} from "nanoid";

export class FirebaseAuth {

    constructor(auth) {
        this.auth = auth;
    }

    googleLogin = async () => {
        const googleProvider = new GoogleAuthProvider();
        const {user} = await signInWithPopup(this.auth, googleProvider);
        return {
            id: user.uid,
            name: user.displayName
        };
    }

    logOut = async () => {
        signOut(this.auth);
    }
    // getCurrentUser = () => {
    //     return this.user;
    // }

}

export class FirebaseDB {
    constructor(app, firestore) {
        this.app = app;
        this.firestore = firestore;
        this.nickNameTemplate = () =>  "user_"+nanoid(8);
        this.dialogIdTemplate = () => nanoid(8);
        this.refs = {}
        this.refs.users = collection(this.firestore, "Users")
        this.refs.user = userId => doc(this.refs.users, userId)
        this.refs.userDialogList = userId => collection(this.refs.user(userId), "dialogList")

        this.refs.dialogs = collection(this.firestore, "Dialogs")
        this.refs.dialog = dialogId => doc(this.refs.dialogs, dialogId)
        this.refs.dialogData = dialogId => collection(this.refs.dialog(dialogId), "data")
        this.refs.dialogInfo = dialogId => collection(this.refs.dialog(dialogId), "info")

    }

    setCurrentUser = (currentUser = {}) => {

        if (Object.keys(currentUser).length != 0) {
            this.currentUserId = currentUser.id
            this.currentUserName = currentUser.name
            // this.refs.currentUser = this.refs.user(this.currentUserId)
            // this.refs.currentUserDialogList = this.refs.userDialogList(this.currentUserId)
        }

        // if (Object.keys(currentDialog).length != 0) {
        //     this.currentDialogId = currentDialog.id
        //     this.currentCompanionId = currentDialog.companionId
        //     this.refs.currentDialog = this.refs.dialog(this.currentDialogId)
        //     this.refs.currentDialogData = this.refs.dialogData(this.currentDialogId)
        //     this.refs.currentDialogInfo = this.refs.dialogInfo(this.currentDialogId)
        //
        //     this.refs.currentCompanionDialog = doc(this.refs.userDialogList(this.currentCompanionId), this.currentDialogId)
        // }
       //console.log( this.refs.currentCompanionDialog)

    }

    createUser = async (userId, userName) => {
        const user = await getDoc(this.refs.user(userId));
        const nickName = this.nickNameTemplate();
        if (!user.exists()) {
            setDoc(this.refs.user(userId), {
                name: userName,
                nickName: nickName
            });
            return {
                id: userId,
                name: userName,
                nickName: nickName
            }
        }
        return {
            id: user.id,
            name: user.data().name,
            nickName: user.data().nickName
        }
    }


    addDialogListener = async (dialogId, callback) => {
        //const q = query(collection(this.firestore, "Dialogs", dialogId, "data"));
        const subscribe = await onSnapshot(this.refs.dialogData(dialogId), (snapshot) => {

            snapshot.docChanges().forEach((change) => {
                if (change.type == "added" && change.doc.data().id != this.currentUserId) callback(change.doc.data());

            });
            //return result.push(doc.docs);
        })


    }


    sendMessage = (dialogId, text, creatorId = this.currentUserId) => {

        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        const message = {
            creatorId: creatorId,
            text: text,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString(),
            timestamp: serverTimestamp()
        }
        const docRef = doc(this.refs.dialogData(dialogId), date + " " + time);
        //console.log(this.refs);
        setDoc(docRef, message);

    }

    getDialogMessages = async (dialogId) => {
        let messages = [];
       // const docRef = collection(this.firestore, "Dialogs", dialogId, "data");
        const q = query(this.refs.dialogData(dialogId), orderBy("timestamp"))
        const docSnap = await getDocs(q);
        if (docSnap) {
            for (let item of docSnap.docs) {
                messages = [...messages, item.data()];
            }
        }
        return messages;
    }

    getUserDialogList = async (userId) => {
        let dialogList = [];
        const docs = await getDocs(this.refs.userDialogList(userId));
        if (docs) {
            docs.forEach((doc) => {
                dialogList.push({id: doc.id, name: doc.data().dialogName, companionId: doc.data().companionId});
            });
        }
        return dialogList;
    }

    dialogWithThisUserExists = async (companionId, currentUserId = this.currentUserId) => {
        //const docRef = collection(this.firestore, "Users", currentUserId, "dialogList");
        const docs = await getDocs(this.refs.userDialogList(currentUserId));
        let dialogID = undefined;
        docs.forEach((document) => {
            if (document.data().companionId == companionId) {
                dialogID = document.id;
            }
        });
        return (dialogID) ? dialogID : false;
    }

    createDialogWith = async (companionId, currentUserId = this.currentUserId, currentUserName = this.currentUserName) => {

        const dialogId = this.dialogIdTemplate();
        const companionName = "Диалог c "+companionId;
        const docRef1 = doc(this.refs.userDialogList(currentUserId), dialogId);
        setDoc(docRef1, {dialogName: companionName, companionId: companionId});

        const docRef2 = doc(this.refs.userDialogList(companionId), dialogId);
        setDoc(docRef2, {dialogName:  currentUserName, companionId: currentUserId});

        const docRef3 = doc(this.refs.dialogInfo(dialogId));
        setDoc(docRef3, {dialogName: companionName, companionId: companionId, creatorId: currentUserId});
        console.log(docRef3)
        return dialogId;

    }

    // renameDialog = async (dialogId, newName, currentUser, companionId) => {
    //     const docRef = await doc(this.refs.userDialogList(companionId), dialogId);
    //     updateDoc(docRef, {dialogName: currentUser.name});
    //     return dialogId;
    //
    // }

    findUserByNickName = async (nickName) => {
        let user = false;
        const docs = await getDocs(this.refs.users);
        docs.forEach((doc) => {
            if (doc.data().nickName == nickName) {
                user = {id: doc.id, name: doc.data().name}
            }
        });
        // console.log(docs)
        return user;
    }

    findUserById = async (userId) => {
        let user = false;
        const docs = await getDocs(this.refs.users);
        docs.forEach((doc) => {
            if (doc.id == userId) {
                user = {id: doc.id, name: doc.data().name}
            }
        });
        return user;
    }

    setNickName = async (nickName, userId = this.currentUserId) => {
        updateDoc(this.refs.user(userId), {nickName: nickName});
    }

    setName = async (name, userId = this.currentUserId) => {
        updateDoc(this.refs.user(userId), {name: name});
    }

}

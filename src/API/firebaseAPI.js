import {GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    startAfter,
    updateDoc,
    where
} from "firebase/firestore";
import {nanoid} from "nanoid";
import {Auth} from "./index";

export class FirebaseAuth {

    constructor(auth) {
        this.auth = auth;
    }

    authHandler = (callback) => {
        this.auth.onAuthStateChanged(req => {
            callback(req)
        });
    }

    googleLogin = async () => {
        const googleProvider = new GoogleAuthProvider();
        const response = await signInWithPopup(this.auth, googleProvider);
        return response;
    }

    logOut = async () => {
        signOut(this.auth);
    }

}

export class FirebaseDB {
    constructor(app, firestore) {

        this.nickNameTemplate = () => "user_" + nanoid(8);
        this.dialogIdTemplate = () => nanoid(8);
        this.dialogNameTemplate = name => name;

        this.messageIdTemplate = () => nanoid(8);

        this.app = app;
        this.firestore = firestore;
        this.listeners = [];

        this.refs = {}
        this.refs.users = collection(this.firestore, "Users")
        this.refs.user = userId => doc(this.refs.users, userId)
        this.refs.userDialogList = userId => collection(this.refs.user(userId), "dialogList")

        this.refs.dialogs = collection(this.firestore, "Dialogs")
        this.refs.dialog = dialogId => doc(this.refs.dialogs, dialogId)
        this.refs.dialogData = dialogId => collection(this.refs.dialog(dialogId), "data")
        this.refs.dialogInfo = dialogId => doc(this.refs.dialog(dialogId), "info", "properties")

    }

    //  setCurrentUser = (currentUser = {}) => {
    // if (Object.keys(currentUser).length != 0) {
    //  this.currentUserId = currentUser.id
    // this.currentUserName = currentUser.name
    // this.refs.currentUser = this.refs.user(this.currentUserId)
    // this.refs.currentUserDialogList = this.refs.userDialogList(this.currentUserId)
    //}

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

    // }

    createUser = async (userId, userName) => {
        const user = await getDoc(this.refs.user(userId));
        const nickName = this.nickNameTemplate();
        if (!user.exists()) {
            console.log(userName)
            setDoc(this.refs.user(userId), {
                name: userName,
                nickName: nickName
            });
            this.currentUserId = userId
            this.currentUserName = userName
            this.currentUserNickName = nickName
            return {
                id: userId,
                name: userName,
                nickName: nickName
            }
        }
        this.currentUserId = user.id
        this.currentUserName = user.data().name
        this.currentUserNickName = user.data().nickName
        return {
            id: user.id,
            name: user.data().name,
            nickName: user.data().nickName
        }
    }

    removeListeners = () => {
        this.listeners.forEach((unsubscribe) => unsubscribe())

    }

    addDialogMessagesListener = async (dialogId, callback) => {
        const q = query(this.refs.dialogData(dialogId), orderBy("timestamp", "desc"), limit(10))
        const unsubscribe = await onSnapshot(q, (snapshot) => {
           // const isLocal = snapshot.metadata.hasPendingWrites;
            snapshot.docChanges().forEach((change) => {
                //console.log(change.doc.data())
               // if (!isLocal) {

                    callback(dialogId, change.doc.data());

                //}
            });
        })
        this.listeners.push(unsubscribe)
        return unsubscribe;
    }


    addDialogListListener = async (userId, callback) => {
        //const q = query(this.refs.userDialogList(userId),orderBy("timestamp", "desc"), limit(1))
        const q = query(this.refs.userDialogList(userId))
        const unsubscribe = await onSnapshot(q, (snapshot) => {

            //const isLocal = snapshot.metadata.hasPendingWrites;
            snapshot.docChanges().forEach(async (change) => {

                console.log(change)
                const dialogId = change.doc.id
                const dialogInfo = await getDoc(this.refs.dialogInfo(dialogId));
                const companionId = dialogInfo.data().companionId;
                const creatorId = dialogInfo.data().creatorId;
                let dialogName;

                if (userId == companionId) {
                    const companionInfo = await getDoc(this.refs.user(creatorId));
                    const companionName = companionInfo.data().name;
                    dialogName = companionName;
                }else{
                    const userInfo = await getDoc(this.refs.user(companionId));
                    const userName = userInfo.data().name;
                    dialogName=userName
                }

                const dialog = {dialogId: dialogId, name: dialogName, ...dialogInfo.data()}
                callback(dialog);

            });
        })
        this.listeners.push(unsubscribe)
        console.log(1111111)
        return unsubscribe;

    }

    addUserInfoListener = async (userId, callback) => {
        const unsubscribe = await onSnapshot(this.refs.user(userId), (snapshot) => {
            callback(snapshot.data());
        })
        this.listeners.push(unsubscribe)
        return unsubscribe;
    }

    // updateDialogName = async (dialogId, newDialogName) => {
    //     return await updateDoc(doc(this.refs.dialogInfo(dialogId), {name: newDialogName}))
    // }


    sendMessage = async (dialogId, message, creatorId = this.currentUserId) => {
        message = {...message, timestamp: serverTimestamp()}

        // const now = new Date();
        // const date = now.toLocaleDateString();
        // const time = now.toLocaleTimeString();
        // const messageId = nanoid(8);
        //
        // let message = {
        //     messageId,
        //     creatorId: creatorId,
        //     text: text,
        //     date: date,
        //     time: time,
        //     timestamp: serverTimestamp()
        //
        // }
        const docRef = doc(this.refs.dialogData(dialogId), message.messageId);
        const r = await setDoc(docRef, message);
       
        const docSnap = await getDoc(docRef);
        const request = docSnap.data();
        return request;

    }

    setDialogMessageProps = async (dialogId, messageId, props) => {
        console.log(props)
        const docRef = doc(this.refs.dialogData(dialogId), messageId);
        const {status} = props;
        let result;
        if (status) result = await updateDoc(docRef, {status});

        return result;

    }


    getDialogMessage = async (dialogId, messageId) => {
        let q = doc(this.refs.dialogData(dialogId), messageId)
        const docSnap = await getDoc(q);
        const message = docSnap.data();
        return message;
    }


    getDialogMessages = async (dialogId, loadLimit = 10, lastVisibleMessageId = 0) => {
        let messages = [];
        let q = query(this.refs.dialogData(dialogId), orderBy("timestamp", "desc"), limit(loadLimit))
        if (lastVisibleMessageId) {
            const lastVisibleMessage = await getDoc(doc(this.refs.dialogData(dialogId), lastVisibleMessageId));
            q = query(
                this.refs.dialogData(dialogId),
                orderBy("timestamp", "desc"),
                startAfter(lastVisibleMessage),
                limit(loadLimit));
        }
        const docSnap = await getDocs(q);
        if (docSnap) {
            for (let item of docSnap.docs) {
                const message = {...item.data()}
                messages = [message, ...messages];
            }
        }
        return messages;
    }


    // getUserDialogList = async (userId) => {
    //     let dialogList = [];
    //
    //     const docs = await getDocs(this.refs.userDialogList(userId));
    //     if (docs) {
    //         docs.forEach((doc) => {
    //             dialogList.push({id: doc.id, name: doc.data().dialogName, companionId: doc.data().companionId});
    //         });
    //     }
    //     return dialogList;
    // }
    getUserDialogsInfo = async (currentUserId = this.currentUserId) => {
        const dialogList = await getDocs(this.refs.userDialogList(currentUserId));

        const dialogIds = []
        dialogList.forEach((dialog) => dialogIds.push(dialog.id));

        const dialogInfoArr = []
        for (const dialogId of dialogIds) {
            const dialogInfo = await getDoc(this.refs.dialogInfo(dialogId));
            dialogInfoArr.push({id: dialogId, ...dialogInfo.data()})
        }

        // console.log(dialogInfoArr)
        return dialogInfoArr;
    }

    findDialogByCompanionId = async (companionId, currentUserId = this.currentUserId) => {
        //const docRef = collection(this.firestore, "Users", currentUserId, "dialogList");
        //const dialogList = await getDocs(this.refs.userDialogList(currentUserId));
        const dialogList = await this.getUserDialogsInfo(currentUserId)
        console.log(dialogList)
        let dialogID=false;
        dialogList.forEach((dialog) => {
            if (dialog.companionId == companionId||dialog.creatorId == companionId) {
                dialogID = dialog.id;
                console.log(dialogID)
            }
        });
        return dialogID;
    }


    createDialogWith = async (companionId, currentUserId = this.currentUserId, currentUserName = this.currentUserName) => {

        const dialogId = this.dialogIdTemplate();

        const user = await getDoc(this.refs.user(companionId));
        const dialogName = this.dialogNameTemplate(user.data().name);

        const docRef1 = doc(this.refs.userDialogList(currentUserId), dialogId);
        setDoc(docRef1, {});
        const docRef2 = doc(this.refs.userDialogList(companionId), dialogId);
        setDoc(docRef2, {});

        // const docRef1 = doc(this.refs.userDialogList(currentUserId), dialogId);
        // setDoc(docRef1, {name: dialogName, companionId: companionId});
        //
        // const docRef2 = doc(this.refs.userDialogList(companionId), dialogId);
        // setDoc(docRef2, {name: currentUserName, companionId: currentUserId});

        const docRef3 = this.refs.dialogInfo(dialogId);
        setDoc(docRef3, {companionId: companionId, creatorId: currentUserId});

        // const docRef4 = doc(this.refs.dialogInfo(dialogId), "dialogName");
        // setDoc(docRef4, dialogName);

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
                user = {id: doc.id, name: doc.data().name, nickName: doc.data().nickName}
            }
        });

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
        return updateDoc(this.refs.user(userId), {nickName: nickName});
    }

    setName = async (name, userId = this.currentUserId) => {
        return updateDoc(this.refs.user(userId), {name: name});
    }

}

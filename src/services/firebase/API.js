import {GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
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
    startAt
} from "firebase/firestore";
import {nanoid} from "nanoid";



export class FirebaseAuth {

    constructor(auth) {
        this.auth = auth;
    }

    authHandler = (callback) => {
        return this.auth.onAuthStateChanged(req => {
            callback(req)
        });
    }

    googleLogin = async () => {
        const googleProvider = new GoogleAuthProvider();
        const response = await signInWithPopup(this.auth, googleProvider);
        return response;
    }

    emailLogin  = async (email, password) => {
        return await signInWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;

                return error;

            });
    }

    emailSignUp  = async (email, password) => {

        return await createUserWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;

            })
            .catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;

                return error;

            });
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


    createUser = async (userId, userName) => {
        const user = await getDoc(this.refs.user(userId));
        const nickName = this.nickNameTemplate();
        if (!user.exists()) {

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

               // if (!isLocal) {

                    callback(dialogId, change.doc.data());

                //}
            });
        })
        this.listeners.push(unsubscribe)
        return unsubscribe;
    }

    addDialogInfoListener = async (dialogId, callback) => {
        const q = query(this.refs.dialogInfo(dialogId))
        const unsubscribe = await onSnapshot(q, (snapshot) => {
            callback(dialogId, snapshot.data());
        })
        this.listeners.push(unsubscribe)
        return unsubscribe;
    }


    addDialogListListener = async (userId, callback) => {
        const q = query(this.refs.userDialogList(userId))
        const unsubscribe = await onSnapshot(q, (snapshot) => {

            snapshot.docChanges().forEach(async (change) => {

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
        return unsubscribe;

    }

    addUserInfoListener = async (userId, callback) => {
        const unsubscribe = await onSnapshot(this.refs.user(userId), (snapshot) => {
            callback(snapshot.data());
        })
        this.listeners.push(unsubscribe)
        return unsubscribe;
    }

    updateDialogName = async (dialogId, newDialogName) => {
        return await updateDoc(doc(this.refs.dialogInfo(dialogId), {name: newDialogName}))
    }


    sendMessage = async (dialogId, message, creatorId = this.currentUserId) => {
        message = {...message, timestamp: serverTimestamp()}
        const docRef = doc(this.refs.dialogData(dialogId), message.messageId);
        const r = await setDoc(docRef, message);
       
        const docSnap = await getDoc(docRef);
        const request = docSnap.data();
        return request;

    }

    getDialogMessages = async (dialogId, lastVisibleMessageId, loadLimit) => {
        let messages = [];

        const lastVisibleMessage = await getDoc(doc(this.refs.dialogData(dialogId), lastVisibleMessageId));
        let q;
        if ((loadLimit < 0)) {
            q = query(
                this.refs.dialogData(dialogId),
                orderBy("timestamp", "desc"),
                startAfter(lastVisibleMessage),
                limit(Math.abs(loadLimit)));
        } else {
            q = query(
                this.refs.dialogData(dialogId),
                orderBy("timestamp", "asc"),
                startAt(lastVisibleMessage),
                limit(Math.abs(loadLimit)));
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


    getUserDialogsInfo = async (currentUserId = this.currentUserId) => {
        const dialogList = await getDocs(this.refs.userDialogList(currentUserId));

        const dialogIds = []
        dialogList.forEach((dialog) => dialogIds.push(dialog.id));

        const dialogInfoArr = []
        for (const dialogId of dialogIds) {
            const dialogInfo = await getDoc(this.refs.dialogInfo(dialogId));
            dialogInfoArr.push({id: dialogId, ...dialogInfo.data()})
        }

        return dialogInfoArr;
    }

    findDialogByCompanionId = async (companionId, currentUserId = this.currentUserId) => {
        const dialogList = await this.getUserDialogsInfo(currentUserId)

        let dialogId=false;
        dialogList.forEach((dialog) => {
            if (dialog.companionId == companionId||dialog.creatorId == companionId) {
                dialogId = dialog.id;

            }
        });
        return dialogId;
    }

    isSavedMessagesExist = async (companionId, currentUserId = this.currentUserId) => {
        const dialogList = await this.getUserDialogsInfo(currentUserId)
        let dialogId = false;
        dialogList.forEach((dialog) => {
            if (dialog.companionId == companionId && dialog.creatorId == companionId) {
                dialogId = dialog.id;
            }
        });
        return dialogId;

    }

    createDialogWith = async (companionId, currentUserId = this.currentUserId, currentUserName = this.currentUserName) => {

        const dialogId = this.dialogIdTemplate();

        const docRef1 = doc(this.refs.userDialogList(currentUserId), dialogId);
        setDoc(docRef1, {});
        const docRef2 = doc(this.refs.userDialogList(companionId), dialogId);
        setDoc(docRef2, {});

        const docRef3 = this.refs.dialogInfo(dialogId);
        setDoc(docRef3, {companionId: companionId, creatorId: currentUserId });

        return dialogId;

    }

    renameDialog = async (dialogId, newName, currentUser, companionId) => {
        const docRef = await doc(this.refs.userDialogList(companionId), dialogId);
        updateDoc(docRef, {dialogName: currentUser.name});
        return dialogId;

    }

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

    setLastRead  = (userId, dialogId, messageTimestamp, messageId) => {
        const docRef = this.refs.dialogInfo(dialogId);
        setDoc(docRef,  { lastRead: {
                [userId]: {
                    messageTimeStamp: messageTimestamp,
                    messageId: messageId
                }
            }},{ merge: true });
    }

}

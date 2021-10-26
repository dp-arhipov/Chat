import React, {useContext, useEffect, useState} from 'react';
import DialogList from "./DialogList";
import DialogWindow from "./DialogWindow";

import {AuthContext, ChatContext} from '../context';
import {useAuthState} from "react-firebase-hooks/auth";
import * as API from "../API"

const Chat = () => {

    const [dialogs, setDialogs] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentDialog, setCurrentDialog] = useState({});
    const [currentUserId, setCurrentUserId] = useState(1);

    const {auth} = useContext(AuthContext);
    const {firestore} = useContext(AuthContext);
    const {currentUser} = useContext(AuthContext);

    const user = useAuthState(auth);

    // const [currentDialog, setCurrentDialog] = useState([]);
    // const [currentUser, setCurrentUser] = useState(user);

    const addMessage = async (text) => {
        const now = new Date();
        const message = {
            id: currentUserId,
            text: text,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString()
        }
        setMessages([...messages, message]);
        API.sendMessage(currentUser.id, currentDialog.id, message);

        //const docRef = doc(firestore, "users", currentUserId, "dialogs", currentDialog.id);
        // setDoc(docRef, {
        //     messages: [...messages, newMessage]
        // }, {merge: true});

        //
        // await updateDoc(docRef, {
        //     messages: arrayUnion(newMessage)
        // });


    }

    const getMessages = (dialogId) => {

        // //const docRef = doc(firestore, "users", currentUserId, "dialogs", currentDialog.id);
        //
        // const docRef = doc(firestore, "users", currentUserId, "dialogs", dialogId);
        // const docSnap = await getDoc(docRef);
        // if (docSnap.exists()) {
        //     return docSnap.data().messages;
        // } else {
        //     // doc.data() will be undefined in this case
        //
        //     return false;
        // }

        return API.getDialogMessages(currentUser.id, currentDialog.id);
    }

    useEffect(async () => {
       // console.log(await API.getDialogList(currentUser.id));
        setDialogs(await API.getDialogList(currentUser.id));
        //await API.getDialogList(currentUser.id);

        // console.log( docSnap);
        //console.log(await API.getDialogList(currentUser.id));
        //const docRef = doc(firestore, "users", currentUser.id, "dialogs", currentDialog.id);

        setCurrentUserId(user[0].uid);
    }, [])

    useEffect(() => {
        if (dialogs.length != 0) {
            setCurrentDialog(dialogs[0]);
        }
    }, [dialogs])

    useEffect(async () => {
        if (currentDialog.hasOwnProperty('id')) {
            let messages = await getMessages(currentDialog.id);
            (messages) ? setMessages(messages) : setMessages([]);
        }

    }, [currentDialog])


    return (
        <ChatContext.Provider value={{messages, addMessage, currentUserId}}>
            <div className={"chat"}>
                <div className={"chat__left-bar"}>
                    <DialogList dialogs={dialogs} setCurrentDialog={setCurrentDialog}/>
                </div>
                <div className="chat__right-bar">
                    <DialogWindow currentDialog={currentDialog}/>
                </div>
            </div>
        </ChatContext.Provider>
    );
};

export default Chat;
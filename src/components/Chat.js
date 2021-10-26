import React, {useContext, useEffect, useState} from 'react';
import DialogList from "./DialogList";
import DialogWindow from "./DialogWindow";
import * as API from "../API";
import {AuthContext, ChatContext} from '../context';
import {doc, setDoc, getDoc} from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";

const Chat = () => {

    const [dialogs, setDialogs] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentDialog, setCurrentDialog] = useState({});
    const [currentUserId, setCurrentUserId] = useState(1);

    const {auth} = useContext(AuthContext);
    const {firestore} = useContext(AuthContext);
    const user = useAuthState(auth);


    const addMessage = async (text) => {

        const now = new Date();
        const newMessage = {
            id: currentUserId,
            text: text,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString()
        }
        setMessages([...messages, newMessage]);


        const docRef = doc(firestore, "users", currentUserId, "dialogs", currentDialog.id);
        setDoc(docRef, {
            messages: [...messages, newMessage]
        }, {merge: true});



    }

    const getMessages = async (dialogId) => {
        //const docRef = doc(firestore, "users", currentUserId, "dialogs", currentDialog.id);

        const docRef = doc(firestore, "users", currentUserId, "dialogs", dialogId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().messages;
        } else {
            // doc.data() will be undefined in this case

            return false;
        }
    }

    useEffect(() => {
        setDialogs(API.getDialogs());
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
            (messages)?setMessages(messages):setMessages([]);

            //*console.log(typeof API.getMessages(currentDialog.id))
           //let messages = API.getMessages(currentDialog.id);
            //setMessages(messages);
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
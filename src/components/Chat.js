import React, {useEffect, useState} from 'react';
import DialogList from "./DialogList";
import DialogWindow from "./DialogWindow";

import {ChatContext} from '../context';
import * as API from "../API"


const Chat = () => {

    const [dialogList, setDialogList] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentDialog, setCurrentDialog] = useState({});
    const currentUser = API.useCurrentUser();

    // const [currentDialog, setCurrentDialog] = useState([]);
    // const [currentUser, setCurrentUser] = useState(user);

    const addMessage = async (text) => {
        const now = new Date();
        const message = {
            id: currentUser.id,
            text: text,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString()
        }
        setMessages([...messages, message]);
        API.sendMessage(currentUser.id, currentDialog.id, message);


    }

    const getMessages = (dialogId) => {
        return API.getDialogMessages(currentUser.id, currentDialog.id);
    }

    useEffect(async () => {
        setDialogList(await API.getDialogList(currentUser.id));

    }, [])

    useEffect(() => {
        if (dialogList.length != 0) {
            setCurrentDialog(dialogList[0]);
        }
    }, [dialogList])

    useEffect(async () => {
        if (currentDialog.hasOwnProperty('id')) {
            let messages = await getMessages(currentDialog.id);
            (messages) ? setMessages(messages) : setMessages([]);
        }

    }, [currentDialog])


    const startDialogWith = async (user) => {
        //await API.setup(currentUser);
        await API.createDialogWith(user, currentUser);


        //setDialogList(await API.getDialogList(currentUser.id));
        //setCurrentDialog(dialogList[API.createDialogWith(user, currentUser)]);
    }

    return (
        <ChatContext.Provider value={{messages, addMessage, startDialogWith}}>
            <div className={"chat"}>
                <div className={"chat__left-bar"}>
                    <DialogList dialogList={dialogList} setCurrentDialog={setCurrentDialog}/>
                </div>
                <div className="chat__right-bar">
                    <DialogWindow currentDialog={currentDialog}/>
                </div>
            </div>
        </ChatContext.Provider>
    );
};

export default Chat;
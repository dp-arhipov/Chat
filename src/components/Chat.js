import React, {useEffect, useState} from 'react';
import DialogList from "./DialogList";
import DialogWindow from "./DialogWindow";
import * as API from "../API";
import ChatContext from '../context'

const Chat = () => {

    const [dialogs, setDialogs] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentDialog, setCurrentDialog] = useState({});
    const [currentUserId, setCurrentUserId] = useState(1);

    const addMessage = (text) => {
        setMessages([...messages, {
            id: currentUserId,
            text: text,
            date: "сегодня"
        }]);
    }

    useEffect(() => {
        setDialogs(API.getDialogs());
    }, [])

    useEffect(() => {
        if(dialogs.length!=0){
            setCurrentDialog(dialogs[0]);
        }
    }, [dialogs])

    useEffect( () => {
        if(currentDialog.hasOwnProperty('id')){
             setMessages(API.getMessages(currentDialog.id));
        }
    },[currentDialog])


    return (
        <ChatContext.Provider value={{messages, addMessage}}>
            <div>
                <h1>{currentDialog.name}</h1>
                <DialogList dialogs={dialogs} setCurrentDialog={setCurrentDialog}/>
                <DialogWindow/>
            </div>
        </ChatContext.Provider>
    );
};

export default Chat;
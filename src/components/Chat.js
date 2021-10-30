import React, {useEffect, useState} from 'react';
import DialogList from "./DialogList";
import DialogWindow from "./DialogWindow";

import {ChatContext} from '../context';
import * as API from "../API"
import Header from "./Header";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";


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
        API.sendMessage(currentUser, currentDialog, text);


    }

    const getMessages = (dialogId) => {
        return API.getDialogMessages(currentUser, currentDialog);
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
        const newDialogId = await API.createDialogWith(user, currentUser);
        setDialogList(await API.getDialogList(currentUser.id));
        setCurrentDialog(dialogList[newDialogId]);
    }

    return (
        <ChatContext.Provider

            value={{messages, addMessage, startDialogWith, currentDialog, dialogList, setCurrentDialog, currentUser}}>

                <Header/>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <DialogList/>
                    </Grid>
                    <Grid item xs={8}>
                        <div style={{height: "800px"}}>
                            <DialogWindow/>
                        </div>
                    </Grid>
                </Grid>

        </ChatContext.Provider>
    );
};

export default Chat;
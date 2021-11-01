import React, {useContext, useEffect, useState} from 'react';
import Main from "./Main";

import {AuthContext, ChatContext} from '../context';
import * as API from "../API"
import Header from "./Header";
import Box from "@mui/material/Box";
import LeftBar from "./LeftBar";


const Chat = () => {

    const [dialogList, setDialogList] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentDialog, setCurrentDialog] = useState({});
    const {currentUser} = useContext(AuthContext);

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
            <Box sx={{display: "grid", grid: "93vh/1fr 3fr"}}>
                <LeftBar/>
                <Main/>
            </Box>


        </ChatContext.Provider>
    );
};

export default Chat;
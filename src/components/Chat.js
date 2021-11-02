import React, {useContext, useEffect, useState} from 'react';
import Main from "./Main";

import {AuthContext, ChatContext} from '../context';
import * as API from "../API"
import Header from "./Header";
import Box from "@mui/material/Box";
import LeftBar from "./LeftBar";
import {store} from '../store'

const Chat = () => {

    const [dialogList, setDialogList] = useState([]);
    const [currentDialog, setCurrentDialog] = useState({});
    const {currentUser} = useContext(AuthContext);

    const addMessage = async (text) => {
        //можно удалять
        //console.log(currentDialog);
        API.sendMessage(currentUser.id, currentDialog.id, text);
        console.log( store.getState());
        console.log(store.getState().dialogList);
        console.log(dialogList);

    }

    const startDialogWith = async (user) => {
        const newDialogId = await API.createDialogWith();
        setDialogList(await API.getDialogList());
        console.log(store.getState().currentDialog)
        setCurrentDialog(store.getState().currentDialog);
        //console.log(currentDialog);

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
        //console.log(store.getState().currentDialog)
        if (currentDialog.hasOwnProperty('id')) {
            await API.setDialogMessages(currentDialog.id);
        }

    }, [currentDialog])




    return (
        <ChatContext.Provider

            value={{addMessage, startDialogWith, currentDialog, dialogList, setCurrentDialog, currentUser}}>

            <Header/>
            <Box sx={{display: "grid", grid: "93vh/1fr 3fr"}}>
                <LeftBar/>
                <Main/>
            </Box>


        </ChatContext.Provider>
    );
};

export default Chat;
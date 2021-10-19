import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import * as selectors from "../store/selectors"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import Container from "@mui/material/Container";
import {useLazyLoading} from "../customHooks/useLazyLoading";

import {
    loadOldCurrentDialogMessages,
    sendMessage,
    setCurrentDialogScrollPosition,
    setCurrentDialogScrollPosition22
} from "../store/actions";

const RightBar = () => {
    console.log("render Main")
    //const currentDialog = useSelector(state => state.currentDialog);
    const currentDialogName = useSelector(selectors.currentDialogName);
    const currentUserId = useSelector(selectors.currentUserId);
    const currentDialogId = useSelector(selectors.currentDialogId);
    const messages = useSelector(selectors.currentDialogMessages);


    const currentDialogScrollPosition = useSelector(selectors.currentDalogScrollPosition);


    const messageListContainerRef = useRef();
    const dispatch = useDispatch();
    const messageHeight = 93;

    useEffect(() => {
        const messageListContainer = messageListContainerRef.current;
        messageListContainer.scrollTop = messageListContainer.scrollHeight
        //messageListContainer.scrollTop = currentDialogScrollPosition
    }, [currentDialogId])


    const scrollBottom = () => {
        const messageListContainer = messageListContainerRef.current;
        if (messageListContainer.scrollTop + messageListContainer.clientHeight + messageHeight == messageListContainer.scrollHeight) {
            messageListContainer.scrollTop = messageListContainer.scrollHeight;
        }
    }

    const onScroll = async () => {
        const messageListContainer = messageListContainerRef.current;
       // dispatch(setCurrentDialogScrollPosition(messageListContainer.scrollTop))
       dispatch(setCurrentDialogScrollPosition22(messageListContainer.scrollTop))
        if (messageListContainer.scrollTop == 0) {
            const scrollHeightOld = messageListContainer.scrollHeight;
            await dispatch(loadOldCurrentDialogMessages());
            const scrollHeightNew = messageListContainer.scrollHeight;
            const scrollDifference = scrollHeightNew - scrollHeightOld;
            messageListContainer.scrollTop = scrollDifference;
        }

    }

    const sendMessageHandler = (message) => {
        dispatch(sendMessage(message));
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h5" p={"1rem"} color="text.secondary" component="div">
                Диалог: {currentDialogName}
            </Typography>
            <Divider/>
            <Box sx={{overflow: 'auto'}} ref={messageListContainerRef} onScroll={onScroll}>
                <MessagesList scrollBottom={scrollBottom} currentUserId={currentUserId} messages={messages}/>
            </Box>
            <Box pt={'1rem'} mt={'auto'}>
                <MessageInput sendMessage={sendMessageHandler}/>
            </Box>
        </Box>


    );
};


export default RightBar;


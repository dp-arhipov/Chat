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
    setCurrentDialogTempScrollPosition
} from "../store/actions";

const RightBar = () => {
    console.log("render Main")
    //const currentDialog = useSelector(state => state.currentDialog);
    const currentDialogName = useSelector(selectors.currentDialogName);
    const currentUserId = useSelector(selectors.currentUserId);
    const currentDialogId = useSelector(selectors.currentDialogId);
    const messages = useSelector(selectors.currentDialogMessages);
    const currentDialogScrollPosition = useSelector(selectors.currentDialogScrollPosition);

    const messageListContainerRef = useRef();
    const dispatch = useDispatch();
    const messageHeight = 93;

    function useDebounce(func, delay, cleanUp = false) {
        const timeoutRef = useRef();

        function clearTimer() {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = undefined;
            }
        }

        useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

        return (...args) => {
            clearTimer();
            timeoutRef.current = setTimeout(() => func(...args), delay);
        };
    }


    useEffect(() => {
        const messageListContainer = messageListContainerRef.current;
        if(currentDialogScrollPosition==-1) messageListContainer.scrollTop = messageListContainer.scrollHeight
        else messageListContainer.scrollTop = currentDialogScrollPosition
    }, [currentDialogId])


    const scrollBottom = () => {
        const messageListContainer = messageListContainerRef.current;
        if (messageListContainer.scrollTop + messageListContainer.clientHeight + messageHeight == messageListContainer.scrollHeight) {
            messageListContainer.scrollTop = messageListContainer.scrollHeight;
        }
    }

    const onScroll = async (ref) => {
        const messageListContainer = messageListContainerRef.current;
       // dispatch(setCurrentDialogScrollPosition(messageListContainer.scrollTop))
       dispatch(setCurrentDialogTempScrollPosition(messageListContainer.scrollTop))
        if (messageListContainer.scrollTop == 0) {
            const scrollHeightOld = messageListContainer.scrollHeight;
            await dispatch(loadOldCurrentDialogMessages());
            const scrollHeightNew = messageListContainer.scrollHeight;
            const scrollDifference = scrollHeightNew - scrollHeightOld;
            messageListContainer.scrollTop = scrollDifference;
        }

    }

    const onScrollDebounced = useDebounce(onScroll, 300);

    const sendMessageHandler = (message) => {
        dispatch(sendMessage(message));
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h5" p={"1rem"} color="text.secondary" component="div">
                Диалог: {currentDialogName}
            </Typography>
            <Divider/>
            <Box sx={{overflow: 'auto'}} ref={messageListContainerRef} onScroll={onScrollDebounced}>
                <MessagesList scrollBottom={scrollBottom} currentUserId={currentUserId} messages={messages}/>
            </Box>
            <Box pt={'1rem'} mt={'auto'}>
                <MessageInput sendMessage={sendMessageHandler}/>
            </Box>
        </Box>


    );
};


export default RightBar;


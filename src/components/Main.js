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

import {loadOldCurrentDialogMessages, setCurrentDialogScrollPosition} from "../store/actions";

const Main = () => {

    //const currentDialog = useSelector(state => state.currentDialog);
    const currentDialogName = useSelector(selectors.currentDialogName);
    const currentDialogId = useSelector(selectors.currentDialogId);
    const currentDialogScrollPosition = useSelector(selectors.currentDalogScrollPosition);
    const messageListContainerRef = useRef();
    const dispatch = useDispatch();
    const messageHeight = 93

    //    //
    useEffect(() => {
        const messageListContainer = messageListContainerRef.current;
        messageListContainer.scrollTop = messageListContainer.scrollHeight;
       // messageListContainer.scrollTop = currentDialogScrollPosition;
        console.log("load")
        console.log(currentDialogScrollPosition)
        // if (messageListContainerRef.current) {
        //     messageListContainerRef.current.scrollIntoView(
        //          {
        //           behavior: 'smooth',
        //
        //      })
        //   }
    }, [])


    const scrollBottom = () => {


        const messageListContainer = messageListContainerRef.current;
        if (messageListContainer.scrollTop + messageListContainer.clientHeight + messageHeight == messageListContainer.scrollHeight) {
            console.log("end")
            messageListContainer.scrollTop = messageListContainer.scrollHeight;
            // messageListContainer.scrollIntoView(
            //     {
            //         behavior: 'smooth',
            //
            //     })
        }


    }


    const onScroll = async () => {
        const messageListContainer = messageListContainerRef.current;

       // console.log(messageListContainer.scrollTop, " ", messageListContainer.scrollHeight, " ", messageListContainer.clientHeight)
        if (messageListContainer.scrollTop == 0) {
            const scrollHeightOld = messageListContainer.scrollHeight;
            await dispatch(loadOldCurrentDialogMessages());
            const scrollHeightNew = messageListContainer.scrollHeight;
            const scrollDifference = scrollHeightNew - scrollHeightOld;
            messageListContainer.scrollTop = scrollDifference;
        }
        dispatch(setCurrentDialogScrollPosition(messageListContainer.scrollTop));
    }


    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h5" p={"1rem"} color="text.secondary" component="div">
                {currentDialogName}
            </Typography>
            <Divider/>
            <Box sx={{overflow: 'auto'}} ref={messageListContainerRef} onScroll={onScroll}>
                <MessagesList scrollBottom={scrollBottom}/>
            </Box>
            <Box pt={'1rem'} mt={'auto'}>
                <MessageInput/>
            </Box>
        </Box>


    );
};

export default Main;
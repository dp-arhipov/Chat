import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import Message from "./Message";
import * as selectors from "../../store/selectors"
import {useDispatch, useSelector} from "react-redux";

import Container from "@mui/material/Container";
import {nanoid} from "nanoid";
import {
    loadOldCurrentDialogMessages,
    setCurrentDialogTempScrollPosition,
    setDialogMessageIsReaded
} from "../../store/actions";
import Box from "@mui/material/Box";
import useDebounce from "../../customHooks/useDebounce";

const MessageList = ({...props}) => {
    const currentUserId = useSelector(selectors.currentUserId);
    const messages = useSelector(selectors.currentDialogMessages);
    const currentDialogId = useSelector(selectors.currentDialogId);
    const currentDialogScrollPosition = useSelector(selectors.currentDialogScrollPosition);
    const currentDialogStatus = useSelector(selectors.currentDialogStatus);


    const dispatch = useDispatch();
    const messageListContainerRef = useRef();
    const messageHeight = 93;
    const messageListContainer = messageListContainerRef.current;
    const [last, setLast] = useState();

    const scrollBottom = () => {
        const messageListContainer = messageListContainerRef.current;
        //console.log(last)
        // console.log("st ", messageListContainer.scrollTop)
        if (last==messageListContainer.scrollTop) {
            messageListContainer.scrollTop = messageListContainer.scrollHeight;
        }
        setLast(messageListContainer.scrollHeight - messageListContainer.offsetHeight)
        // console.log("last", messageListContainer.scrollHeight - messageListContainer.offsetHeight)
    }

    useEffect(()=>{
        const messageListContainer = messageListContainerRef.current;
        setLast(messageListContainer.scrollHeight - messageListContainer.offsetHeight)
        // console.log("last uf ", messageListContainer.scrollTop)
        // console.log(messages)
    })

    useEffect(() => {
        scrollBottom();
    }, [messages.length])


    useEffect(() => {
        const messageListContainer = messageListContainerRef.current;
        if (currentDialogScrollPosition == -1) messageListContainer.scrollTop = messageListContainer.scrollHeight
        else messageListContainer.scrollTop = currentDialogScrollPosition
        // console.log("last uf 2", messageListContainer.scrollTop)
    }, [currentDialogId])


    const onRead = (messageId) => {
        dispatch(setDialogMessageIsReaded(currentDialogId, messageId))
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


    return (
        <Box {...props}  overflow='auto' ref={messageListContainerRef} onScroll={onScrollDebounced} p={2}>
            {messages.map(message => {
                    const isCurrentUserMessage = (message.creatorId == currentUserId)
                    return (
                        <Message
                            sx={{
                                backgroundColor: isCurrentUserMessage ? 'inherit' : 'rgba(25,118,210,0.11)',
                                marginLeft: isCurrentUserMessage ? 'auto' : 0,
                                marginBottom:1,
                                width: 'max-content',
                                maxWidth:'60%'
                            }}

                            isCurrentUserMessage={isCurrentUserMessage}
                            status={message.status}
                            key={nanoid(8)}
                            messageId={message.messageId}
                            text={message.text}
                            date={message.date}
                            time={message.time}
                            onRead={onRead}
                        />)
                }
            )}
        </Box>
    );
};

export default React.memo(MessageList);

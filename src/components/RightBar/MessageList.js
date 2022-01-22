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
    const dialogId = useSelector(selectors.currentDialogId);
    const messages = useSelector(selectors.currentDialogMessages);
    const dispatch = useDispatch();


    const currentDialogId = useSelector(selectors.currentDialogId);
    const currentDialogScrollPosition = useSelector(selectors.currentDialogScrollPosition);
    const messageListContainerRef = useRef();
    const messageHeight = 93;

    const scrollBottom = () => {
        const messageListContainer = messageListContainerRef.current;
        if (messageListContainer.scrollTop + messageListContainer.clientHeight + messageHeight == messageListContainer.scrollHeight) {
            messageListContainer.scrollTop = messageListContainer.scrollHeight;
        }
    }

    useEffect(() => {
        scrollBottom();
    }, [messages])


    useEffect(() => {
        const messageListContainer = messageListContainerRef.current;
        if (currentDialogScrollPosition == -1) messageListContainer.scrollTop = messageListContainer.scrollHeight
        else messageListContainer.scrollTop = currentDialogScrollPosition
    }, [currentDialogId])


    const onRead = (messageId) => {
        dispatch(setDialogMessageIsReaded(dialogId, messageId))
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
        <Box {...props} sx={{overflow: 'auto'}} ref={messageListContainerRef} onScroll={onScrollDebounced}>
            {messages.map(message => {
                    const isCurrentUserMessage = (message.creatorId == currentUserId)
                    return (
                        <Message
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

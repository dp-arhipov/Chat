import React, {Fragment, useCallback, useContext, useEffect, useRef, useState} from 'react';
import Message from "./Message";
import * as selectors from "../../../store/selectors"
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import Container from "@mui/material/Container";
import {nanoid} from "nanoid";
import {
    addCDMessagesTop,
    loadOldCurrentDialogMessages,
    setCurrentDialogTempScrollPosition,
    setDialogMessageIsReaded
} from "../../../store/actions";
import Box from "@mui/material/Box";
import useDebounce from "../../../customHooks/useDebounce";
import useScroll from "../../../customHooks/useScroll";
import {setDialogProps, shiftDialogMessages} from "../../../store/slices";
import {DB} from "../../../API";
import {makeStyles} from "@mui/styles";
import StyledMessage from "./StyledMessage";
import {useInView} from "react-intersection-observer";
import usePrevious from "../../../customHooks/usePrevious";
import CircularProgress from "@mui/material/CircularProgress";
import MessageList from "./MessageList";

const MessageListContainer = ({...props}) => {
    const currentUserId = useSelector(selectors.currentUserId);

    const currentDialog = useSelector(selectors.currentDialog)
    const currentDialogScrollPosition = currentDialog.scrollPosition;
    const currentDialogStatus = currentDialog.status;
    const messages = currentDialog.messages;
    const currentDialogId = currentDialog.dialogId;
    const previousDialogId = usePrevious(currentDialogId)
    const dispatch = useDispatch();
    const {containerRef, scrollTo, setPinBottom, setScrollBottom, scrollTopPercents, scrollTop, scrollBottom, setSaveScrollPosition, init} = useScroll(
        [messages.length],
        50,
    );

    useEffect(async () => {
        // console.log(`0-- dialog status: ${currentDialogStatus}, scrollTop: ${scrollTop}, scrollTopPercents: ${scrollTopPercents}, scrollBottom: ${scrollBottom}`);
        if (scrollTopPercents <= 10) {
            if (currentDialogStatus != 'FETCHING') {

                dispatch(setDialogProps({dialogId: currentDialogId, status: 'FETCHING'}))
                const messages = await dispatch(loadOldCurrentDialogMessages())
                setSaveScrollPosition(true)
                dispatch(addCDMessagesTop(messages))
                dispatch(setDialogProps({dialogId: currentDialogId, status: 'LOADED'}))
                setSaveScrollPosition(false)
            }
        }
        if (scrollBottom <= 0) {
            setPinBottom(true)
        } else {
            setPinBottom(false)
        }
    }, [scrollBottom])


    useEffect(() => {
        if (previousDialogId) {
            let sc = scrollBottom
            if (!scrollBottom) sc = '0'
            dispatch(setDialogProps({dialogId: previousDialogId, scrollPosition: sc}))
        }
        if (currentDialogScrollPosition == '0') {
            scrollTo('bottom');
        } else {
            scrollTo('bottom', currentDialogScrollPosition - 0)
        }
    }, [currentDialogId])


    const onRead = useCallback((messageId) => {
        dispatch(setDialogMessageIsReaded(currentDialogId, messageId))
    }, [containerRef]);



    const needTopLoader = currentDialogStatus=='FETCHING' && scrollTop==0 && messages.length>=20
    return (
        <MessageList ref={containerRef} needTopLoader={needTopLoader}>
            {messages.map(message => {
                    const isCurrentUserMessage = (message.creatorId == currentUserId)
                    return (
                        <StyledMessage
                            isCurrentUserMessage={isCurrentUserMessage}
                            status={message.status}
                            key={message.messageId}
                            messageId={message.messageId}
                            text={message.text}
                            date={message.date}
                            time={message.time}
                            onRead={onRead}
                        />
                    )
                }
            )}

        </MessageList>

    );
};


export default React.memo(MessageListContainer);

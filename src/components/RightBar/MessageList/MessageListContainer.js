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
    setDialogMessageIsReaded, setCurrentDialogLastRead
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
import Date from "./Date";

const MessageListContainer = ({...props}) => {
    const currentUserId = useSelector(selectors.currentUserId);


    const currentDialog = useSelector(selectors.currentDialogInfo)

    const currentDialogLastRead = currentDialog.lastReadedMessageBy;
    const currentCompanionId = currentDialog.companionId;
    const currentDialogStatus = currentDialog.status;
    const messages = currentDialog.messages;
    const currentDialogId = currentDialog.id;
    const dispatch = useDispatch();
    const {containerRef, scrollTo, setPinBottom, setScrollBottom, scrollTopPercents, scrollTop, scrollBottom, setSaveScrollPosition, init} = useScroll(
        [messages.length],
        50,
    );

    useEffect(async () => {
        // console.log(`0-- dialog status: ${currentDialogStatus}, scrollTop: ${scrollTop}, scrollTopPercents: ${scrollTopPercents}, scrollBottom: ${scrollBottom}`);
        if (scrollTopPercents <= 5) {
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
        if(currentDialog.firstUnreadedMessageOf(currentUserId)) {
            const element = document.getElementById("firstUnreadedMessage");
            if (element) {
                element.scrollIntoView(true);
            }
        }else{
            setPinBottom(true)
        }


        // if (previousDialogId) {
        //     let sc = scrollBottom
        //     if (!scrollBottom) sc = '0'
        //     dispatch(setDialogProps({dialogId: previousDialogId, scrollPosition: sc}))
        //     // dispatch(setLastActiveTime(previousDialogId))
        // }
        // if (currentDialogScrollPosition == '0') {
        //     scrollTo('bottom');
        // } else {
        //     scrollTo('bottom', currentDialogScrollPosition - 0)
        // }
    }, [currentDialogId])



    const onRead =  useCallback(async (messageTimestamp, messageId) => {
        dispatch(setCurrentDialogLastRead(messageTimestamp, messageId))
    }, [containerRef]);



    const needTopLoader = currentDialogStatus=='FETCHING' && scrollTop==0 && messages.length>=20
    let previousDate = null;

    return (
        <MessageList ref={containerRef} needTopLoader={needTopLoader}>
            {messages.map(message => {

                const isCurrentUserMessage = (message.creatorId == currentUserId)
                const isReaded = (currentDialogLastRead(currentCompanionId)?.timestamp) && currentDialogLastRead(currentCompanionId)?.timestamp.toMillis() >= message?.timestamp?.toMillis()
                const isFirstUnreadedMessage = (currentDialog.firstUnreadedMessageOf(currentUserId)?.id == message.messageId);

                const date = message.date;
                const newDate = date != previousDate
                if (newDate) previousDate = date;

                    return (
                        <Fragment>
                            {(newDate)&&
                            <div style={{margin:'2rem'}}>
                                <Date date={date}/>
                            </div>
                            }
                        <StyledMessage
                            isCurrentUserMessage={isCurrentUserMessage}
                            id={isFirstUnreadedMessage ? 'firstUnreadedMessage' : null}
                            status={isReaded ? 'READED' : message.status}
                            key={message.messageId}
                            messageId={message.messageId}
                            text={message.messageId+ message?.timestamp?.toMillis() +" "+message.text}
                            time={message.time}
                            timestamp={message.timestamp}
                            onRead={onRead}

                        />
                            </Fragment>
                    )
                }
            )}

        </MessageList>

    );
};


export default React.memo(MessageListContainer);

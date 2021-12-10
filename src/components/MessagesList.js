import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import Message from "./Message";
import * as selectors from "../store/selectors"
import {store} from '../store'
import {useSelector} from "react-redux";
import {useLazyLoading} from "../customHooks/useLazyLoading";
import Container from "@mui/material/Container";
const MessagesList = () => {

    const currentUserId = useSelector(selectors.currentUserId);
    const messages = useSelector(selectors.currentDialogMessages);
    //console.log(messages)
    //const mRef = useRef();

    // useEffect(() => {
    //     if (mRef.current) {
    //         mRef.current.scrollIntoView(
    //             {
    //                 behavior: 'smooth',
    //                 block: 'end',
    //                 inline: 'nearest'
    //             })
    //     }
    // })


    return (
        <Container>
            {messages.map(message =>
                <Message
                    text={message.text}
                    date={message.date}
                    time={message.time}
                    creatorId={message.creatorId}
                    currentUserId={currentUserId}
                />
            )}
        </Container>
    );
};

export default MessagesList;

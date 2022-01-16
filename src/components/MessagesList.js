import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import Message from "./Message";
import * as selectors from "../store/selectors"
import {store} from '../store'
import {useSelector} from "react-redux";
import {useLazyLoading} from "../customHooks/useLazyLoading";
import Container from "@mui/material/Container";
import {nanoid} from "nanoid";

const MessagesList = ({scrollBottom, messages, currentUserId}) => {
    console.log("render MessageList")
    useEffect(() => {
        scrollBottom();
    }, [messages])


    return (
        <Container>
            {messages.map(message => {
                    return (
                        <Message
                            status={message.status}
                            key={message.messageId}
                            text={message.text}
                            date={message.date}
                            time={message.time}
                            creatorId={message.creatorId}
                            currentUserId={currentUserId}
                        />)
                }
            )}
        </Container>
    );
};

export default React.memo(MessagesList);

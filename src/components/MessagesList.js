import React, {useContext, useEffect, useRef, useState} from 'react';
import Message from "./Message";
import * as selectors from "../store/selectors"
import {store} from '../store'
import {useSelector} from "react-redux";
const MessagesList = () => {

    const currentUserId = useSelector(selectors.currentUserId);
    const messages = useSelector(selectors.messages);
    const messageRef = useRef();

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView(
                {
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest'
                })
        }
    })

    return (
        <div ref={messageRef}>
            {messages.map(message =>
                <Message
                    text={message.text}
                    date={message.date}
                    time={message.time}
                    creatorId={message.creatorId}
                    currentUserId={currentUserId}
                />
            )}

        </div>
    );
};

export default MessagesList;

import React, {useContext, useEffect, useRef, useState} from 'react';
import Message from "./Message";

import {store} from '../store'
import {useSelector} from "react-redux";
const MessagesList = () => {

    const currentUserId = useSelector(state => state.currentUser.id);
    const messages = useSelector(state => state.messages);
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
                    id={message.id}
                    currentUserId={currentUserId}
                />
            )}

        </div>
    );
};

export default MessagesList;

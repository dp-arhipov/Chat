import React, {useContext, useEffect, useRef, useState} from 'react';
import Message from "./Message";

import {store} from '../store'
const MessagesList = () => {
    const [messages,setMessages] = useState(store.getState().messages);
    store.subscribe(() => {
        setMessages(store.getState().messages);
    })


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
                />
            )}
        </div>
    );
};

export default MessagesList;
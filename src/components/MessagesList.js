import React, {useContext, useEffect, useRef} from 'react';
import Message from "./Message";
import {ChatContext} from '../context';

const MessagesList = () => {
    const {messages} = useContext(ChatContext);
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
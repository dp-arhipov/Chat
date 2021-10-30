import React, {useContext, useEffect} from 'react';
import Message from "./Message";
import {ChatContext} from '../context';
import Box from "@mui/material/Box";

const MessagesList = () => {
    const {messages} = useContext(ChatContext);

    return (
        <div>
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
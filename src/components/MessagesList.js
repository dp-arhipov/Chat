import React, {useContext} from 'react';
import Message from "./Message";
import {ChatContext} from '../context';

const MessagesList = () => {
    const {messages} = useContext(ChatContext)


    return (
        <div className={"messages-list"}>
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
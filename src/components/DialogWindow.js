import React, {useState} from 'react';
import MessageInput from "./MessageInput";
import MessagesList from "./MessagesList";
import {useParams} from "react-router-dom";


const ChatWindow = ({messages, setMessages}) => {
    const currentUserId = 1;
    const params = useParams();
    const dialogId = params.id;

    const handleSubmit = (e, inputText) => {
        console.log(e, inputText);
        e.preventDefault();
        setMessages([...messages,{
            id: currentUserId,
            text: inputText,
            date: "сегодня"
        }]);
    }

    return (
        <div className={"chat-window"}>
            <MessagesList messages={messages}/>
            <MessageInput handleSubmit={handleSubmit}/>
        </div>
    );
};

export default ChatWindow;
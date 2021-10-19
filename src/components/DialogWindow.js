import React, {useState} from 'react';
import MessageInput from "./MessageInput";
import MessagesList from "./MessagesList";

const DialogWindow = () => {

    return (
        <div className={"chat-window"}>
            <MessagesList/>
            <MessageInput/>
        </div>
    );
};

export default DialogWindow;
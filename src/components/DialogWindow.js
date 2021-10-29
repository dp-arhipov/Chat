import React,{useContext} from 'react';
import MessageInput from "./MessageInput";
import MessagesList from "./MessagesList";


import {ChatContext} from '../context';
import UserBlock from "./UserBlock";

const DialogWindow = () => {

    const {currentDialog} = useContext(ChatContext)


    return (
        <div className={"dialog-window"}>
<UserBlock/>
            <h3 className={"dialog-window__title"}>{currentDialog.name}</h3>

            <div className="dialog-window__messages">
                <MessagesList/>
            </div>
            <div className="dialog-window__input">
                <MessageInput/>
            </div>
        </div>
    );
};

export default DialogWindow;
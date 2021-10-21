import React from 'react';
import MessageInput from "./MessageInput";
import MessagesList from "./MessagesList";

const DialogWindow = ({currentDialog}) => {

    return (
        <div className={"dialog-window"}>
            <h2 className={"dialog-window__title"}>{currentDialog.name}</h2>
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
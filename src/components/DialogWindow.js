import React from 'react';
import MessageInput from "./MessageInput";
import MessagesList from "./MessagesList";
import {Button} from "react-bootstrap";
import * as API from "../API"

const DialogWindow = ({currentDialog}) => {

    const logOutButtonHandler = () => {
        API.logOut();
    }
    return (
        <div className={"dialog-window"}>
            <h2 className={"dialog-window__title"}>{currentDialog.name}</h2>
            <Button onClick={logOutButtonHandler}>Выход</Button>
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
import React, {useContext} from 'react';
import MessageInput from "./MessageInput";
import MessagesList from "./MessagesList";
import {signOut} from "firebase/auth";
import {AuthContext} from "../context";
import {Button} from "react-bootstrap";

const DialogWindow = ({currentDialog}) => {
    const {auth} = useContext(AuthContext);
    const logOutButton = async () => {
        signOut(auth);
    }
    return (
        <div className={"dialog-window"}>
            <h2 className={"dialog-window__title"}>{currentDialog.name}</h2>
            <Button onClick={logOutButton}>Выход</Button>
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
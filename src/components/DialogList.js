import React, {useState} from 'react';
import Dialog from "./Dialog";
import { Link } from 'react-router-dom'
import {ListGroup} from "react-bootstrap";

const DialogList = ({dialogs, setCurrentDialog}) => {

    return (
    <ListGroup className={"dialog-list"}>
        {dialogs.map((dialog) => {
            return <ListGroup.Item className={"dialog-list__item"} key={dialog.dialogId} onClick={()=>setCurrentDialog(dialog)}>{dialog.name}</ListGroup.Item>
        })}
    </ListGroup>

    );
};

export default DialogList;
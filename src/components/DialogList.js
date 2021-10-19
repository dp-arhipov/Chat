import React, {useState} from 'react';
import Dialog from "./Dialog";
import { Link } from 'react-router-dom'

const DialogList = ({dialogs, setCurrentDialog}) => {

    return (
        <div className={"dialog-list"}>
            <ul>
                {dialogs.map((dialog) => {
                return <li key={dialog.dialogId} onClick={()=>setCurrentDialog(dialog)}>{dialog.name}</li>
                })}
            </ul>
        </div>
    );
};

export default DialogList;
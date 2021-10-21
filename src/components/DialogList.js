import React, {useState} from 'react';
import Dialog from "./Dialog";
import { Link } from 'react-router-dom'

const DialogList = ({dialogs, setCurrentDialog}) => {

    return (

            <ul className={"dialog-list"}>
                {dialogs.map((dialog) => {
                return <li className={"dialog-list__item"} key={dialog.dialogId} onClick={()=>setCurrentDialog(dialog)}>{dialog.name}</li>
                })}
            </ul>

    );
};

export default DialogList;
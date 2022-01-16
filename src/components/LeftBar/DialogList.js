import React, {Fragment} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {dialogsInfo} from "../../store/selectors"
import {setCurrentDialog} from "../../store/actions";
import Dialog from "./Dialog";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

const DialogList = () => {
    //console.log("render DialogList")
    const _dialogsInfo = useSelector(dialogsInfo);
    const dispatch = useDispatch();
    const dialogClickHandle = (dialogId) => {
        dispatch(setCurrentDialog(dialogId));
    }

    return (
        <List>
            {_dialogsInfo.map((dialog) => {
                return (
                    <Fragment key={dialog.id}>
                        <Dialog id={dialog.id}
                                name={dialog.name}
                                lastMessage={(dialog.lastMessage)?(dialog.lastMessage.slice(0,30)+'...'):''}
                                dialogClickHandle={dialogClickHandle}/>
                        <Divider variant="inset" component="li"/>
                    </Fragment>
                )
            })}
        </List>

    )
        ;
};

export default React.memo(DialogList);
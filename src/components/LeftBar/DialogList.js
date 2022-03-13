import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {dialogs, currentDialogId} from "../../store/selectors"
import {setCurrentDialog} from "../../store/actions";
import Dialog from "./Dialog";

import List from "@mui/material/List";
import Box from "@mui/material/Box";


const DialogList = ({...props}) => {
    const _dialogs = useSelector(dialogs);
    const _currentDialogId = useSelector(currentDialogId);
    const dispatch = useDispatch();

    const onClickHandle = (e, dialogId) => {
        dispatch(setCurrentDialog(dialogId));
    }

    return (
        <Box {...props} sx={{overflowY:'auto'}}>
            <List sx={{ minWidth:'0'}}>
                {_dialogs.map((dialog) => {
                    return (
                        <Dialog
                            isFavourites = {dialog.name=='Избранное'}
                            sx={{height:'5rem'}}
                            selected={_currentDialogId === dialog.id}
                            key={dialog.id}
                            onClick={(e) => onClickHandle(e,dialog.id)}
                            id={dialog.id}
                            name={dialog.name}
                            caption={(dialog.lastMessage.text) ? (dialog.lastMessage.text) : ''}
                            unreadMessagesNumber = {dialog.unreadMessagesNumber}
                            button
                            divider
                        />
                    )
                })}
            </List>
        </Box>

    )
        ;
};

export default React.memo(DialogList);
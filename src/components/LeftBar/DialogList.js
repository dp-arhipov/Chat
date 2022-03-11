import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {dialogsInfo} from "../../store/selectors"
import {setCurrentDialog} from "../../store/actions";
import Dialog from "./Dialog";

import List from "@mui/material/List";
import Box from "@mui/material/Box";

const DialogList = ({...props}) => {
    const _dialogsInfo = useSelector(dialogsInfo);
    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = useState();


    const onClickHandle = (e, dialogId) => {
        setSelectedId(dialogId);
        dispatch(setCurrentDialog(dialogId));
    }

    return (
        <Box {...props} sx={{overflowY:'auto'}}>
            <List sx={{ minWidth:'0'}}>
                {_dialogsInfo.map((dialog) => {
                    return (
                        <Dialog
                            sx={{height:'5rem'}}
                            selected={selectedId === dialog.id}
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
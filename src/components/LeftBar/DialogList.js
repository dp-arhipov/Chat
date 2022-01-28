import React, {Fragment} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {dialogsInfo} from "../../store/selectors"
import {setCurrentDialog} from "../../store/actions";
import Dialog from "./Dialog";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";

const DialogList = ({...props}) => {
    //console.log("render DialogList")
    const _dialogsInfo = useSelector(dialogsInfo);
    const dispatch = useDispatch();
    const dialogClickHandle = (dialogId) => {
        dispatch(setCurrentDialog(dialogId));
    }

    return (
        <Box {...props} sx={{overflowY:'auto'}}>
            <List sx={{ minWidth:'0'}}>
                {_dialogsInfo.map((dialog) => {
                    return (
                        <Dialog

                            key={dialog.id}
                            onClick={() => dialogClickHandle(dialog.id)}

                            id={dialog.id}
                            name={dialog.name}
                            caption={(dialog.lastMessage) ? (dialog.lastMessage) : ''}
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
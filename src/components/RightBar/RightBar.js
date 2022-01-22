import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import * as selectors from "../../store/selectors"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MessagesList from "./MessageList";
import MessageInput from "./MessageInput";


import {
    sendMessage,
} from "../../store/actions";

//import * as actions from "../../store/actions";

const RightBar = () => {
    console.log("render Main")

    const currentDialogName = useSelector(selectors.currentDialogName);
    const dispatch = useDispatch();

    const sendMessage_ = (message) => {
        dispatch(sendMessage(message));
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h5" p={"1rem"} color="text.secondary" component="div">
                Диалог: {currentDialogName}
            </Typography>
            <Divider/>
            <MessagesList/>
            <MessageInput pt={'1rem'} mt={'auto'} submitHandler={sendMessage_}/>
        </Box>


    );
};


export default RightBar;


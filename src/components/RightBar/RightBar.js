import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
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
import Grid from "@mui/material/Grid";

//import * as actions from "../../store/actions";

const RightBar = () => {
    console.log("render Main")

    const currentDialogName = useSelector(selectors.currentDialogName);
    const dispatch = useDispatch();

    const sendMessage_ = (message) => {
        dispatch(sendMessage(message));
    }


    return (


        <Box display={'flex'} flexDirection={'column'} flex={'1'} sx={{minWidth:'0'}}>
            {
                currentDialogName
                    ?
                    <Fragment>
                        <Typography variant="h6" pb={2} pl={2} color="text.secondary">
                            Диалог: {currentDialogName}
                        </Typography>
                        <Divider/>
                        <MessagesList flex='1 0 0'/>
                        <MessageInput pt={1} mt={'auto'} submitHandler={sendMessage_}/>
                    </Fragment>
                    :
                    <Box display={'flex'} flexDirection={'column'} flex={'1'} alignItems={'center'} justifyContent={'center'}>
                        <Typography variant="body1" color="text.secondary">
                            Выберите существующий диалог или создайте новый при помощи поиска
                        </Typography>
                    </Box>
            }
        </Box>


    )

};


export default RightBar;


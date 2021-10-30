import React, {useContext} from 'react';
import MessageInput from "./MessageInput";
import MessagesList from "./MessagesList";


import {ChatContext} from '../context';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const DialogWindow = () => {

    const {currentDialog} = useContext(ChatContext)


    return (
        <div style={{ height: 'inherit'}}>

            <Typography variant="h4" color="text.secondary" component="div">
                Диалог с {currentDialog.name}
            </Typography>
            <Box sx={{overflow: 'auto', height: '100%'}}>
                <MessagesList/>
            </Box>
            <Box pt={'1rem'}>
                <MessageInput/>
            </Box>
        </div>
    );
};

export default DialogWindow;
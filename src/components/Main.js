import React, {Fragment, useContext} from 'react';
import MessageInput from "./MessageInput";
import MessagesList from "./MessagesList";


import {ChatContext} from '../context';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Divider} from "@mui/material";


const Main = () => {

    const {currentDialog} = useContext(ChatContext);

    return (
        <Box sx={{display:'flex', flexDirection: 'column'}}>
            <Typography variant="h5" p={"1rem"} color="text.secondary" component="div">
                Диалог с {currentDialog.name}
            </Typography>
            <Divider/>
            <Box sx={{overflow: 'auto'}}>
                <MessagesList/>
            </Box>
            <Box pt={'1rem'} mt={'auto'}>
                <MessageInput/>
            </Box>
        </Box>
    );
};

export default Main;
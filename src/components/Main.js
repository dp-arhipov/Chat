import React, {Fragment, useContext, useState} from 'react';
import MessageInput from "./MessageInput";
import MessagesList from "./MessagesList";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Divider} from "@mui/material";
import {store} from '../store'

const Main = () => {

    const [currentDialog,setCurrentDialog] = useState(store.getState().currentDialog);
    store.subscribe(() => {
        setCurrentDialog(store.getState().currentDialog);
    })

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
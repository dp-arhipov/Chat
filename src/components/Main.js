import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import * as selectors from "../store/selectors"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";

const Main = () => {

    //const currentDialog = useSelector(state => state.currentDialog);
    const currentDialog = useSelector(selectors.currentDialog);
    const isCurrentDialogFetching = useSelector(selectors.isCurrentDialogFetching);

    return (
        (!isCurrentDialogFetching) &&
        <Box sx={{display: 'flex', flexDirection: 'column'}}>

            <Typography variant="h5" p={"1rem"} color="text.secondary" component="div">
                {currentDialog.name}
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
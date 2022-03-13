import React, {Fragment} from 'react';
import {useSelector, useDispatch} from "react-redux";
import * as selectors from "../../store/selectors"

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MessagesList from "./MessageList/MessageListContainer";
import MessageInput from "./MessageInput";


import {
    sendMessage, setCurrentDialog,
} from "../../store/actions";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const RightBar = () => {

const currentDialog = useSelector(selectors.currentDialogInfo);

    const currentDialogName = currentDialog?.name;
    const dispatch = useDispatch();

    const sendMessage_ = (message) => {
        dispatch(sendMessage(message));
    }

    const onBackButtonClick = () => {
        dispatch(setCurrentDialog('none'))
    }


    return (

        <Box display={'flex'} flexDirection={'column'} flex={'1'} sx={{minWidth: '0'}}>
            {
                currentDialogName
                    ?
                    <Fragment>
                        <Box display={'flex'} alignItems={'center'} p={2}>
                            <IconButton onClick={onBackButtonClick} sx={{marginRight:'1rem'}}>
                                <ArrowBackIcon />
                            </IconButton>
                            <Typography variant="h6"  color="text.secondary">
                                {currentDialogName}
                            </Typography>
                        </Box>
                        <Divider/>
                        <MessagesList/>
                        <Box pl={1} pt={1} mt={'auto'}>
                            <MessageInput submitHandler={sendMessage_}/>

                        </Box>

                    </Fragment>
                    :
                    <Box display={'flex'} flexDirection={'column'} flex={'1'} alignItems={'center'}
                         justifyContent={'center'}>
                        <Typography variant="body1" color="text.secondary">
                            Выберите существующий диалог или создайте новый при помощи поиска
                        </Typography>
                    </Box>
            }
        </Box>


    )

};


export default RightBar;


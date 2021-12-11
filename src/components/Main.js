import React, {useCallback, useEffect, useRef} from 'react';
import {useSelector,useDispatch} from "react-redux";
import * as selectors from "../store/selectors"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import Container from "@mui/material/Container";
import {useLazyLoading} from "../customHooks/useLazyLoading";
import {loadOldCurrentDialogMessages} from "../store/actions";

const Main = () => {

    //const currentDialog = useSelector(state => state.currentDialog);
    const currentDialogName = useSelector(selectors.currentDialogName);
    const currentDialogId = useSelector(selectors.currentDialogId);
    const messageListContainerRef = useRef();
    const dispatch = useDispatch();
    //
    // useEffect(() => {
    //     if (messageListContainerRef.current) {
    //         messageListContainerRef.current.scrollIntoView(
    //             {
    //                 behavior: 'smooth',
    //                 block: 'end',
    //                 inline: 'nearest'
    //             })
    //     }
    // })

    // const appendItems = useCallback(() => {
    //     console.log(  messageListContainerRef.current.scrollTop)
    //     messageListContainerRef.current.scrollTop=0
    // });

    //
    // const [onScroll, messageListContainerRef] = useLazyLoading({
    //     onIntersection: appendItems,
    //     delay: 1200
    // });

    const onScroll = () =>{
        const m = messageListContainerRef.current.scrollTop
        if (m==0){
            dispatch(loadOldCurrentDialogMessages());
        }

    }
   // console.log(currentDialogId)
    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>

            <Typography variant="h5" p={"1rem"} color="text.secondary" component="div">
                {currentDialogName}
            </Typography>
            <Divider/>
            <Box sx={{overflow: 'auto'}} ref={messageListContainerRef} onScroll={onScroll}>
                <MessagesList/>
            </Box>
            <Box pt={'1rem'} mt={'auto'}>
                <MessageInput/>
            </Box>
        </Box>


    );
};

export default Main;
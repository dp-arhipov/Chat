import React, {Fragment, useEffect} from 'react';
import Main from "./Main";
import Header from "./Header";
import Box from "@mui/material/Box";
import LeftBar from "./LeftBar";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../store/selectors"
import {initChat} from "../store/actions"

const Chat = () => {
    const dispatch = useDispatch();
    const currentDialogId = useSelector(selectors.currentDialogId);
    useEffect(() => {
        dispatch(initChat());

    }, [])

    //console.log(currentDialogId)
    return (
        <Fragment>
            <Header/>
            <Box sx={{display: "grid", grid: "93vh/1fr 3fr"}}>
                <LeftBar/>
                {(currentDialogId) && <Main/>}
            </Box>
        </Fragment>
    );
};

export default Chat;
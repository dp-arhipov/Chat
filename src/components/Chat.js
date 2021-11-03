import React, {Fragment, useContext, useEffect, useState} from 'react';
import Main from "./Main";
import * as API from "../API"
import Header from "./Header";
import Box from "@mui/material/Box";
import LeftBar from "./LeftBar";


const Chat = () => {

    useEffect(async () => {
        API.initDialog();
    }, [])


    return (
        <Fragment>
            <Header/>
            <Box sx={{display: "grid", grid: "93vh/1fr 3fr"}}>
                <LeftBar/>
                <Main/>
            </Box>
        </Fragment>
    );
};

export default Chat;
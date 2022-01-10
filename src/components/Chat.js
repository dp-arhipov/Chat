import React, {Fragment, useEffect} from 'react';
import RightBar from "./RightBar";
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
                {(currentDialogId)? <RightBar/>:<Box sx={{display: "flex", alignItems: "center",justifyContent:"center"}}>Выберите существующий диалог или создайте новый при помощи поиска</Box>}
            </Box>
        </Fragment>
    );
};

export default Chat;
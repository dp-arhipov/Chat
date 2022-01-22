import React, {Fragment, useEffect} from 'react';
import RightBar from "./RightBar/RightBar";
import Header from "./Header/Header";
import Box from "@mui/material/Box";
import LeftBar from "./LeftBar/LeftBar";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../store/selectors"
import {init} from "../store/actions"

const Main = () => {
    const dispatch = useDispatch();
    const currentDialogId = useSelector(selectors.currentDialogId);
    const currentDialogName = useSelector(selectors.currentDialogName);
    //const dialogListStatus = useSelector(selectors.dialogListStatus);
    useEffect(() => {
        dispatch(init());

    }, [])

    //console.log(currentDialogId)
    return (
        <Fragment>
            <Header/>
            <Box sx={{display: "grid", grid: "93vh/1fr 3fr"}}>
                <LeftBar/>
                {(currentDialogId&&currentDialogName)? <RightBar/>:<Box sx={{display: "flex", alignItems: "center",justifyContent:"center"}}>Выберите существующий диалог или создайте новый при помощи поиска</Box>}
            </Box>
        </Fragment>
    );
};

export default Main;
import React, {Fragment, useEffect} from 'react';
import RightBar from "./RightBar/RightBar";
import Header from "./Header/Header";
import Box from "@mui/material/Box";
import LeftBar from "./LeftBar/LeftBar";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../store/selectors"
import {init} from "../store/actions"
import Grid from "@mui/material/Grid";
import {Divider} from "@mui/material";
import Paper from "@mui/material/Paper";

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
            <Grid container height={'100vh'} direction="column">
                <Grid item>
                    <Header/>
                </Grid>
                <Grid container flex={'1'}>
                    <Grid container xs={3}>
                        <LeftBar/>
                    </Grid>

                    <Grid container xs={9}>
                        <RightBar/>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Main;
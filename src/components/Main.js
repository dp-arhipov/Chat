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

import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles'


const Main = () => {
    const dispatch = useDispatch();
    const currentDialogId = useSelector(selectors.currentDialogId);
    const currentDialogName = useSelector(selectors.currentDialogName);
    const currentUserName = useSelector(selectors.currentUserName);


    useEffect(() => {
        if(currentUserName) dispatch(init());

    }, [])

    const theme = useTheme()
    console.log(currentDialogId=='none' || currentDialogId=='')
    const useStyles = makeStyles(()=> ({
        leftBar: {
            [theme.breakpoints.down('md')]: {
                display: (currentDialogId!='none' && currentDialogId!='')?'none':'',
            },
        },
        rightBar: {
            [theme.breakpoints.down('md')]: {
                display: (currentDialogId=='none' || currentDialogId=='')?'none':'',
            },
        }
    }))

    const classes = useStyles();
    return (

        <Fragment>
            <Grid container height={'100vh'} direction="column" >
                <Grid item>
                    <Header/>
                </Grid>
                <Grid container flex={'1'} >
                    <Grid container sm={12} md={3} className={classes.leftBar}>
                        <LeftBar />
                    </Grid>

                    <Grid container sm={12} md={9} className={classes.rightBar} >
                        <RightBar/>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Main;
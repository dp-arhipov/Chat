import React, {Fragment, useEffect} from 'react';
import RightBar from "./RightBar/RightBar";
import Header from "./Header/Header";
import LeftBar from "./LeftBar/LeftBar";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../store/selectors"
import {init} from "../store/actions"
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles'


const Main = () => {
    const dispatch = useDispatch();

    const currentDialog = useSelector(selectors.currentDialogInfo);
    const currentDialogId = currentDialog?.id;

    const currentUserId = useSelector(selectors.currentUserId);

    useEffect(() => {
        if(currentUserId) dispatch(init());
    }, [currentUserId])

    const theme = useTheme()
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
            <Grid container height={'100%'} direction="column" >
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
import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import * as API from '../API';
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import {useDispatch, useSelector} from "react-redux";

import {logIn} from "../store/actions"
import * as selectors from "../store/selectors";
import { useCookies } from 'react-cookie';

const Login = () => {
    const dispatch = useDispatch();


    // const currentUser = useSelector(selectors.currentUser);
    // const currentDialog = useSelector(selectors.currentDialogId);

//
// useEffect(()=>{
//     DB.addListeners(currentDialog)
//     console.log("**")
//
// },[currentDialog])


    const loginButtonHandler = ( ) => {
        //API.logIn();
        dispatch(logIn());

    }



    return (
        <Paper sx={{display: 'flex', alignItems:"center", justifyContent:"center", height: '100vh'}}>
            <Button onClick={loginButtonHandler}>Логин</Button>
        </Paper>
    );
};

export default Login;
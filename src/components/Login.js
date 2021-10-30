import React, {useContext} from 'react';
import {Button} from "react-bootstrap";

import * as API from '../API';
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

const Login = () => {
    const loginButtonHandler = () => {
        API.logIn();
    }
    return (
        <Paper sx={{display: 'flex', alignItems:"center", justifyContent:"center", height: '100vh'}}>
            <Button onClick={loginButtonHandler}>Логин</Button>
        </Paper>
    );
};

export default Login;
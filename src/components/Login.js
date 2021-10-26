import React, {useContext} from 'react';
import {Button} from "react-bootstrap";

import * as API from '../API';

const Login = () => {
    const loginButtonHandler = () => {
        API.logIn();
    }
    return (
        <div>
            <Button onClick={loginButtonHandler}>Логин</Button>
        </div>
    );
};

export default Login;
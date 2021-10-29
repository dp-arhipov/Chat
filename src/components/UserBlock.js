import React, {useContext} from 'react';
import {Button} from "react-bootstrap";
import * as API from "../API"
import {ChatContext} from "../context";
import avatar from "../avatar.png"
import logOut from "../log-out.png"

const UserBlock = () => {
    const logOutButtonHandler = () => {
        API.logOut();
    }
const {currentUser} = useContext(ChatContext);
    return (
        <div>
            <img src={avatar} alt="Avatar"/>
            <h1>{currentUser.name}</h1>
            <Button size="sm" onClick={logOutButtonHandler}>Выход</Button>

        </div>
    );
};

export default UserBlock;
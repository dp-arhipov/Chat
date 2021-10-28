import React, {useContext, useEffect, useState} from 'react';
import * as API from "../API";
import {ListGroup} from "react-bootstrap";
import {ChatContext} from "../context";

const UserList = () => {
    const [userList, setUserList] = useState([]);
    const {startDialogWith} = useContext(ChatContext)
    const handleButton = async (user) => {
        startDialogWith(user);
    }

    useEffect(async () => {
        setUserList(await API.getUsers());
    }, [])

    return (

        <ListGroup>
            {
                userList.map((user) => {
                    return <ListGroup.Item onClick={()=>handleButton(user)}>{user.name}</ListGroup.Item>
                })
            }

        </ListGroup>

    );
};

export default UserList;
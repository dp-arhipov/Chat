import React, {Fragment, useContext} from 'react';
import {ListGroup} from "react-bootstrap";
import UserList from "./UserList";
import {ChatContext} from '../context';

const DialogList = () => {
    const {dialogList, setCurrentDialog} = useContext(ChatContext);

    return (
        <Fragment>
            <ListGroup className={"dialog-list"}>
                {dialogList.map((dialog) => {
                    return <ListGroup.Item
                        className={"dialog-list__item"}
                        key={dialog.id}
                        onClick={() => setCurrentDialog(dialog)}>
                        {dialog.name}
                    </ListGroup.Item>
                })}
            </ListGroup>

            <UserList/>
        </Fragment>

    );
};

export default DialogList;
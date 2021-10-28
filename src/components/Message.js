import React, {useContext} from 'react';
import {Card} from "react-bootstrap";
import {useCurrentUser} from "../API";

const Message = ({text, date, id, time}) => {
    //const {currentUser} = useContext(AuthContext);
    const currentUser = useCurrentUser();
    return (

        <div className={"message-item"}>
            <Card border="primary" style={{ width: '25rem', marginLeft: (id==currentUser.id)?'auto': 0, marginBottom:'0.5rem'}}>
                <Card.Header>{date}  {time}</Card.Header>
                <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                        {text}
                    </Card.Text>
                </Card.Body>
            </Card>


        </div>
    );
};

export default Message;
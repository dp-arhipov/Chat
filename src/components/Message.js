import React, {useContext} from 'react';
import {Card} from "react-bootstrap";
import {ChatContext} from "../context";

const Message = ({text, date, id, time}) => {
    const {currentUserId} = useContext(ChatContext);
    //const currentUserId = 1;
    return (

        <div className={"message-item"}>
            <Card border="primary" style={{ width: '25rem', marginLeft: (id==currentUserId)?'auto': 0, marginBottom:'0.5rem'}}>
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
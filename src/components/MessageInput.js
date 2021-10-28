import React, {useContext, useState} from 'react';
import {AuthContext, ChatContext} from '../context';
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";


const MessageInput = () => {
    const {addMessage} = useContext(ChatContext)
    const [inputText, setInputText] = useState();

    const handleSubmitButton = (e) => {
        e.preventDefault();
        if (inputText.trim() != '') {
            addMessage(inputText);
        }
        setInputText('');

    }


    return (

        <Form className={"message-input"} onSubmit={e => handleSubmitButton(e)}>

            <InputGroup size="lg">
                <FormControl
                    placeholder="Введите сообщение..."
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}

                />
                <Button variant="outline-primary" type="submit">
                    Button
                </Button>
            </InputGroup>

        </Form>


    )
        ;
};

export default MessageInput;
import React, {useContext, useState} from 'react';
import {ChatContext} from '../context';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";


const MessageInput = () => {
    const {addMessage} = useContext(ChatContext)
    const [inputText, setInputText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputText.trim() != '') {
            addMessage(inputText);
        }
        setInputText('');
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{display: 'flex', alignItems: 'center'}}>
            <TextField
                sx={{flex: 1}}
                size="small"
                placeholder="Введите сообщение..."
                variant="outlined"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
            />
            <Button variant="outlined" type="submit" size="large">
                Отправить
            </Button>
        </Box>

    );
};

export default MessageInput;
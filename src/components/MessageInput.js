import React, {useContext, useState} from 'react';

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import * as API from "../API";
import {sendMessage, setDefaultDialog} from "../store/actions";
import {useDispatch} from "react-redux";


const MessageInput = () => {


    const [inputText, setInputText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputText.trim() != '') {
            // API.sendMessage(inputText);
            dispatch(sendMessage(inputText));
        }
        setInputText('');
    }

    return (


        <Box component="form" onSubmit={handleSubmit} sx={{display: 'flex'}}>
            <TextField
                sx={{flex: '1'}}
                variant="outlined"
                size="small"
                placeholder="Введите сообщение..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <Button type="submit" variant="filled">
                                Отправить
                            </Button>
                        </InputAdornment>
                }}

            />
        </Box>


    );
};

export default MessageInput;
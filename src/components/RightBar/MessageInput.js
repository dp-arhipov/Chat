import React, {useContext, useRef, useState} from 'react';

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SendIcon from '@mui/icons-material/Send';

const MessageInput = ({submitHandler, ...props}) => {

    const [inputText, setInputText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText.trim() != '') {
            submitHandler(inputText);
        }
        setInputText('');
        const input = e.target.messageInput
        if(input) input.focus();
    }

    const onChange = (e) => {
        setInputText(e.target.value)
    }

    const onKey = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            if (e.shiftKey) {
                setInputText(inputText + '\r')
            }
            if (!e.shiftKey) {
                handleSubmit(e)
            }
        }
    }

    return (
        <Box {...props} >
            <form onSubmit={handleSubmit}>
                <TextField
                    name={'messageInput'}
                    onKeyDown={onKey}
                    onChange={onChange}
                    value={inputText}
                    multiline
                    maxRows={10}
                    size="small"
                    placeholder="Введите сообщение..."
                    fullWidth
                    autoFocus
                    noValidate
                    autoComplete='off'
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton aria-label="send" type="submit">
                                    <SendIcon/>
                                </IconButton>
                            </InputAdornment>
                    }}

                />
            </form>
        </Box>
    );
};

export default React.memo(MessageInput);
import React, {Fragment, useContext, useState} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import {ChatContext} from "../context";
import * as API from "../API";

const FinderInput = ({handleFinder, finderInputText, setFinderInputText}) => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const text = finderInputText.trim();
        if (text != '') {
            handleFinder(text);
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{display: 'flex'}}>
            <TextField
                sx={{flex: '1'}}
                placeholder="Введите nickname..."
                value={finderInputText}
                onChange={e => setFinderInputText(e.target.value)}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <Button type="submit" variant="filled">
                                Найти
                            </Button>
                        </InputAdornment>
                }}

            />
        </Box>
    );
};

export default FinderInput;
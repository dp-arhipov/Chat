import React from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';

const FinderInput = ({handleFinder, finderInputText, setFinderInputText}) => {

    const handleChange = async (event) => {
        setFinderInputText(event.target.value);
        event.preventDefault();
        const text = event.target.value.trim();
        if (text != '') {
            handleFinder(text);
        }

    }


    return (
        <Box component="form" sx={{display: 'flex'}}>
            <TextField
                sx={{flex: '1'}}
                placeholder="Найти..."
                value={finderInputText}
                onChange={handleChange}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <SearchIcon/>


                        </InputAdornment>
                }}

            />
        </Box>
    );
};

export default FinderInput;
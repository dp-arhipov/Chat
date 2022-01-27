import React, {useRef} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {setFinderStatus} from "../../store/slices";
import {useDispatch, useSelector} from "react-redux";
import {find} from "../../store/actions";
import useDebounce from "../../customHooks/useDebounce";
import * as selectors from "../../store/selectors";

const FinderInput = ({handleFinder}) => {

    const finderStatus = useSelector(selectors.finderStatus);
    const dispatch = useDispatch();
    const searchRef = useRef();
    const handleChange = async (event) => {
        const text = event.target.value.trim();
        if (text != '') {
            dispatch(find(text))
        } else {
            dispatch(setFinderStatus('INIT'));
        }
    }

    const handleDeleteButton = () => {
        searchRef.current.value = '';
        dispatch(setFinderStatus('INIT'));
     }

    const handleChangeDebounce = useDebounce(handleChange, 300);

    return (
        <Box component="form" sx={{display: 'flex'}}>
            <TextField
                noValidate
                autoComplete='off'
                sx={{flex: '1'}}
                placeholder="Найти..."
                defaultValue=''
                inputRef={searchRef}
                onChange={handleChangeDebounce}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            {(finderStatus == "INIT")
                                ? <SearchIcon sx={{cursor:"pointer"}}/>
                                : <CloseRoundedIcon onClick={handleDeleteButton} sx={{cursor:"pointer"}}/>
                            }
                        </InputAdornment>
                }}

            />
        </Box>
    );
};

export default FinderInput;
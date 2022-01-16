import React, {useContext, useState} from 'react';
import DialogList from "./DialogList";
import Box from "@mui/material/Box";
import FinderInput from "./FinderInput";
import FinderResult from "./FindResList";
import {useDispatch, useSelector} from "react-redux";
import {createDialogWith, find} from "../store/actions"
import * as selectors from "../store/selectors"

const LeftBar = () => {
    const [finderInputText, setFinderInputText] = useState('');
    const findResult = useSelector(selectors.findResultsData);
    const findResultsStatus = useSelector(selectors.findResultsStatus);

    const dispatch = useDispatch();
    const handleItemClick = async (userId) => {
        //API.createDialogWith(user);
        dispatch(createDialogWith(userId));
        setFinderInputText('')
    }
    const handleFinder = async (text) => {
        setTimeout(async () => {
            dispatch(find(text));
        }, 300);

    }

    return (
        <Box p={'1rem'}>
            <FinderInput handleFinder={handleFinder} finderInputText={finderInputText}
                         setFinderInputText={setFinderInputText}/>

            {(finderInputText.trim() != '')
                ? <FinderResult handleItemClick={handleItemClick} findResult={findResult} status={findResultsStatus}/>
                : <DialogList/>
            }
        </Box>
    );
};

export default LeftBar;
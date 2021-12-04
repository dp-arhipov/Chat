import React, {useContext, useState} from 'react';
import DialogList from "./DialogList";
import Box from "@mui/material/Box";
import FinderInput from "./FinderInput";
import FinderResult from "./FindResList";

import * as API from "../API";
import {useDispatch, useSelector} from "react-redux";
import {createDialogWith, find} from "../store/actions"
import * as selectors from "../store/selectors"

const LeftBar = () => {
    const [finderInputText, setFinderInputText] = useState('');
   // const [findResult, setFindResult] = useState('');
    const findResult = useSelector(selectors.findResults);
    const isFindResultsFetching = useSelector(selectors.isFindResultsFetching);

    const dispatch = useDispatch();
    const handleItemClick = async (userId) => {
        //API.createDialogWith(user);
        dispatch(createDialogWith(userId));
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
                ? <FinderResult handleItemClick={handleItemClick} findResult={findResult} isFindResultsFetching={isFindResultsFetching}/>
                : <DialogList/>
            }
        </Box>
    );
};

export default LeftBar;
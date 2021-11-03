import React, {useContext, useState} from 'react';
import DialogList from "./DialogList";
import Box from "@mui/material/Box";
import FinderInput from "./FinderInput";
import FinderResult from "./FindResList";

import * as API from "../API";

const LeftBar = () => {
    const [finderInputText, setFinderInputText] = useState('');
    const [findResult, setFindResult] = useState([]);

    const handleItemClick = async (user) => {
        API.createDialogWith(user);
    }
    const handleFinder = async (text) => {
        let result = await API.find(text);
        (result) ? setFindResult([result]) : setFindResult('');
    }

    return (
        <Box p={'1rem'}>
            <FinderInput handleFinder={handleFinder} finderInputText={finderInputText}
                         setFinderInputText={setFinderInputText}/>
            {(finderInputText.trim() != '')
                ? <FinderResult handleItemClick={handleItemClick} findResult={findResult}/>
                : <DialogList/>
            }
        </Box>
    );
};

export default LeftBar;
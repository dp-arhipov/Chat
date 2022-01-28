import React, {useContext, useEffect, useRef, useState} from 'react';
import DialogList from "./DialogList";
import Box from "@mui/material/Box";
import FinderInput from "./FinderInput";
import FinderResultList from "./FinderResultList";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../../store/selectors"
const LeftBar = () => {

    const finderStatus = useSelector(selectors.finderStatus);

    return (
        <Box display={'flex'} flexDirection={'column'} sx={{minWidth:'0'}}>
            <FinderInput/>

            {(finderStatus!='INIT')
                ? <FinderResultList/>
                : <DialogList flex='1 0 0'/>
            }
        </Box>
    );
};

export default LeftBar;
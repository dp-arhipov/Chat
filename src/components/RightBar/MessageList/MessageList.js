import React, {forwardRef, memo} from 'react';
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {useSelector} from "react-redux";
import * as selectors from "../../../store/selectors";
import FlexCenter from "../../../HOC/FlexCenter";
import "./style.css"

const MessageList = forwardRef(({children}, ref)=>{
    const currentDialogStatus = useSelector(selectors.currentDialogStatus);

    return (
        <div className={'container'} ref={ref} >
            <FlexCenter>
                {currentDialogStatus=='FETCHING' && <CircularProgress />}
            </FlexCenter>
            {children}
        </div>
    );
});

export default React.memo(MessageList);
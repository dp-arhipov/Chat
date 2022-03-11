import React, {forwardRef} from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import FlexCenter from "../../../HOC/FlexCenter";
import "./style.css"

const MessageList = forwardRef(({children, needTopLoader}, ref)=>{


    return (
        <div className={'container'} ref={ref} >
            <FlexCenter>
                {needTopLoader && <CircularProgress />}
            </FlexCenter>
            {children}
        </div>
    );
});

export default React.memo(MessageList);
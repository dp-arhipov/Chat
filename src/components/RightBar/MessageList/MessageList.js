import React, {forwardRef} from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import FlexCenter from "../../FlexCenter";

const MessageList = forwardRef(({children, needTopLoader}, ref)=>{


    return (
        <div style={{
            overflow:'auto',
            padding:'2rem',
            flex: 1,
            flexBasis:0,
            overflowAnchor:'none'
        }} ref={ref} >
            <FlexCenter>
                {needTopLoader && <CircularProgress />}
            </FlexCenter>
            {children}
        </div>
    );
});

export default React.memo(MessageList);
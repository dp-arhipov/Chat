import React, {memo} from 'react';
import Box from "@mui/material/Box";

const FlexCenter = ({children, ...props}) => {
    return (
        <Box display='flex' alignItems='center' justifyContent='center' {...props}>
            {children}
        </Box>
    );
};

export default memo(FlexCenter);
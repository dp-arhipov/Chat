import React from 'react';
import Box from "@mui/material/Box";

const CenterXY = ({children}) => {
    return (
        <Box display='flex' alignItems='center' justifyContent='center' height='100vh'>
            {children}
        </Box>
    );
};

export default CenterXY;
import React, {memo} from 'react';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import grey from "@mui/material/colors/grey";

const Date = ({date}) => {



    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Paper elevation={0} sx={{padding: '0.5rem 1rem', backgroundColor: grey[50]}}>
                <Typography variant="subtitle2" color="textSecondary">
                    {date}
                </Typography>
            </Paper>
        </Box>
    );
};

export default memo(Date);
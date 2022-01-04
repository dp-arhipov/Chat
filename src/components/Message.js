import React from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Message = ({text, date, creatorId, currentUserId, time, status}) => {

    return (

        <Box display="flex">


            <Box sx={{
                width: '25rem',
                marginLeft: (creatorId == currentUserId) ? 'auto' : 0,
                marginBottom: '0.5rem'
            }}>
                <Card elevation={1}>
                    <CardContent>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            {date} {time} {status}
                        </Typography>
                        <Typography noWrap={false} component="div" variant="body1">
                            {text}
                        </Typography>

                    </CardContent>
                </Card>
            </Box>
        </Box>

    );
};

export default Message;
import React, {useContext} from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import {store} from "../store";

const Message = ({text, date, id, time}) => {

    const currentUser = store.getState().currentUser;
    return (

        <Box display="flex">


            <Box sx={{
                width: '25rem',
                marginLeft: (id == currentUser.id) ? 'auto' : 0,
                marginBottom: '0.5rem'
            }}>
                <Card elevation={1}>
                    <CardContent>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            {date} {time}
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
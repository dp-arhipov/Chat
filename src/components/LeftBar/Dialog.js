import React, {Fragment} from 'react';

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import {styled} from '@mui/material/styles';
import Box from "@mui/material/Box";

const Dialog = ({name, caption, unreadMessagesNumber, ...props}) => {

    return (
        <ListItem {...props} >

            <ListItemAvatar>
                <Avatar alt={name} src="/static/images/avatar/1.jpg"/>
            </ListItemAvatar>

                <ListItemText
                    primary={
                        <Typography sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: 'text.primary'
                        }}>
                            {name}
                        </Typography>
                    }
                    secondary={
                        <Typography sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: 'text.secondary',

                        }}>
                            {caption}
                        </Typography>
                    }
                />
            <Box>
                <Badge color="primary" badgeContent={unreadMessagesNumber} sx={{width: '1rem', marginRight:'0.5rem'}} />
            </Box>

        </ListItem>
    );
};

export default Dialog;
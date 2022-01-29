import React from 'react';

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";


const Dialog = ({name, caption, ...props}) => {
    return (
        <ListItem {...props}>
            <ListItemAvatar>
                <Avatar alt={name} src="/static/images/avatar/1.jpg"/>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography sx={{overflow:'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color:'text.primary'}}>
                        {name}
                    </Typography>
                }
                secondary={
                    <Typography sx={{overflow:'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color:'text.secondary'}}>
                        {caption}
                    </Typography>
                }
            />
        </ListItem>
    );
};

export default Dialog;
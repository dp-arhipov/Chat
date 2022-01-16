import React from 'react';

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";


const Dialog = ({id, name,lastMessage, dialogClickHandle}) => {
    return (
            <ListItem sx={{cursor: "pointer"}} alignItems="flex-start"
                      onClick={() => dialogClickHandle(id)}>
                <ListItemAvatar>
                    <Avatar alt={name} src="/static/images/avatar/1.jpg"/>
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={lastMessage}
                />
            </ListItem>
    );
};

export default Dialog;
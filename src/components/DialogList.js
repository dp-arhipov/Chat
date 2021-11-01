import React, {Fragment, useContext} from 'react';
import {ChatContext} from '../context';
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";

const DialogList = () => {
    const {dialogList, setCurrentDialog} = useContext(ChatContext);
    return (
        <List>
            {dialogList.map((dialog) => {
                return (
                    <Fragment>
                        <ListItem sx={{cursor: "pointer"}} alignItems="flex-start" key={dialog.id}
                                  onClick={() => setCurrentDialog(dialog)}>
                            <ListItemAvatar>
                                <Avatar alt={dialog.name} src="/static/images/avatar/1.jpg"/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={dialog.name}
                                secondary={"Текст последнего сообщения"}
                            />
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                    </Fragment>
                )
            })}
        </List>
    );
};

export default DialogList;
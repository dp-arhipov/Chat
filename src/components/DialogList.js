import React, {Fragment, useState} from 'react';
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import * as API from '../API'
import {store} from "../store";

const DialogList = () => {
    //const {dialogList, setCurrentDialog} = useContext(ChatContext);
    const [dialogList, setDialogList] = useState(store.getState().dialogList);
    store.subscribe(() => {
        setDialogList(store.getState().dialogList);
        //console.log(store.getState())
    })
    const itemClickHandle = (dialogID) => {
        API.setCurrentDialog(dialogID);
    }
    return (
        <List>
            {dialogList.map((dialog) => {
                return (
                    <Fragment>
                        <ListItem sx={{cursor: "pointer"}} alignItems="flex-start" key={dialog.id}
                                  onClick={() => itemClickHandle(dialog.id)}>
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
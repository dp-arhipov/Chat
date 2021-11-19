import React, {Fragment, useState} from 'react';
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import * as API from '../API'
import {store} from "../store";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../store/selectors"
import {setDefaultDialog, changeCurrentDialog} from "../store/actions";

const DialogList = () => {
    //const {dialogList, setCurrentDialog} = useContext(ChatContext);
    // const [dialogList, setDialogList] = useState(store.getState().dialogList);
    // store.subscribe(() => {
    //     setDialogList(store.getState().dialogList);
    //     //console.log(store.getState())
    // })


    const dialogList = useSelector(selectors.dialogList);
    const dispatch = useDispatch();
    const itemClickHandle = (dialogID) => {
        //API.setCurrentDialog(dialogID);
        dispatch(changeCurrentDialog(dialogID));

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
import React, {Fragment} from 'react';
import List from "@mui/material/List";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../store/selectors"
import {setCurrentDialog} from "../store/actions";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const DialogList = () => {

    const dialogListObj = useSelector(selectors.dialogList);
    const dialogListArr = Object.values(dialogListObj)
    const dispatch = useDispatch();
    const itemClickHandle = (dialogID) => {
        //API.setCurrentDialogIdTest(dialogID);
        dispatch(setCurrentDialog(dialogID));

    }



    return (
        <List>
            {dialogListArr.map((dialog) => {
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
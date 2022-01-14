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
    //console.log("render DialogList")
    const dialogListArray = useSelector(selectors.dialogListArray);
    //const dialogArrayTest = useSelector(selectors.dialogArray);
    //const dialogListObj = useSelector(selectors.dialogList);
   // const dialogListArr = Object.values(dialogListObj)
    const dispatch = useDispatch();
    const itemClickHandle = (dialogID) => {
        dispatch(setCurrentDialog(dialogID));

    }
   // console.log(dialogListArray)
   //
   //  console.log(lastMessage)
   //  const lastMessage = (dialogID)=>{
   //      const lastMessage = useSelector(selectors.dialogLastMessage(dialogID))
   //  }

    return (
        <List>
            {dialogListArray.map((dialog) => {
                return (
                    <Fragment  key={dialog.id}>
                        <ListItem sx={{cursor: "pointer"}} alignItems="flex-start"
                                  onClick={() => itemClickHandle(dialog.id)}>
                            <ListItemAvatar>
                                <Avatar alt={dialog.name} src="/static/images/avatar/1.jpg"/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={dialog.name}
                                secondary={dialog.lastMessage.slice(0,30)+"..."}
                            />



                        </ListItem>
                        <Divider variant="inset" component="li"/>
                    </Fragment>
                )
            })}
        </List>

    );
};

export default React.memo( DialogList);
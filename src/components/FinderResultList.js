import React, {Fragment} from 'react';
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../store/selectors";
import {createDialogWith} from "../store/actions";

const FinderResultList = () => {


    const finderData = useSelector(selectors.finderData);
    const finderStatus = useSelector(selectors.finderStatus);
    const dispatch = useDispatch();

    const handleItemClick = (userId) => {
        dispatch(createDialogWith(userId));
    }

    return (
        <Box>
            {(finderStatus =="FETCHING")
                ? <Typography variant="subtitle1" color="text.secondary" component="div" sx={{padding:"10px"}}>
                    Идет поиск...
                </Typography>

                : (finderData.length!=0)
                    ? finderData.map((user) => {
                        return (
                            <Fragment>
                                <Typography variant="subtitle1" color="text.secondary" component="div" sx={{padding:"10px"}}>
                                    Результаты поиска:
                                </Typography>
                                <ListItem onClick={() => handleItemClick(user.id)} sx={{cursor: "pointer"}}
                                          alignItems="flex-start" key={user.id}>
                                    <ListItemAvatar>
                                        <Avatar alt={user.name} src="/static/images/avatar/1.jpg"/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user.name}
                                    />
                                </ListItem>
                                <Divider variant="inset"/>
                            </Fragment>
                        )
                    })
                    : <Typography variant="subtitle1" color="text.secondary" component="div" sx={{padding:"10px"}}>
                        Ничего не найдено
                    </Typography>

            }
        </Box>
    );
};

export default FinderResultList;
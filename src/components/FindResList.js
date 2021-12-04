import React, {Fragment} from 'react';
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const FindResList = ({handleItemClick, findResult, isFindResultsFetching}) => {
   // console.log(findResult.length);
    return (
        <Box>
            {(isFindResultsFetching)
                ? <Typography variant="subtitle1" color="text.secondary" component="div">
                    Идет поиск...
                </Typography>

                : (findResult.length!=0)
                    ? findResult.map((user) => {
                        return (
                            <Fragment>
                                <ListItem onClick={() => handleItemClick(user.id)} sx={{cursor: "pointer"}}
                                          alignItems="flex-start" key={user.id}>
                                    <ListItemAvatar>
                                        <Avatar alt={user.name} src="/static/images/avatar/1.jpg"/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user.name}
                                        secondary={"Текст последнего сообщения"}
                                    />
                                </ListItem>
                                <Divider variant="inset"/>
                            </Fragment>
                        )
                    })
                    : <Typography variant="subtitle1" color="text.secondary" component="div">
                        Ничего не найдено
                    </Typography>

            }
        </Box>
    );
};

export default FindResList;
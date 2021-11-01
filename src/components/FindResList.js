import React, {Fragment} from 'react';
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const FindResList = ({handleItemClick, findResult}) => {
    return (
        <Box>
            {
                (findResult.length != 0)
                    ? findResult.map((item) => {
                        return (
                            <Fragment>
                                <ListItem onClick={() => handleItemClick(item)} sx={{cursor: "pointer"}}
                                          alignItems="flex-start" key={item.id}>
                                    <ListItemAvatar>
                                        <Avatar alt={item.name} src="/static/images/avatar/1.jpg"/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.name}
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
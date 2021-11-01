import React, {useContext} from 'react';
import {AppBar, IconButton, Typography} from '@mui/material';
import * as API from "../API"
import {ChatContext} from "../context";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Toolbar from "@mui/material/Toolbar";
import {AccountCircle} from "@mui/icons-material";

const Header = () => {
    const logOutButtonHandler = () => {
        API.logOut();
    }
    const {currentUser} = useContext(ChatContext);
    return (
        <AppBar position="static" >
            <Toolbar>
                {/*<img src={avatar} alt="Avatar"/>*/}
                <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
                    AMessanger
                </Typography>
                <Typography variant="h6" component="div">
                    {currentUser.name}
                </Typography>
                <IconButton color="inherit">
                    <AccountCircle />
                </IconButton>

                <IconButton color="inherit" onClick={logOutButtonHandler}>
                    <LogoutRoundedIcon fontSize="medium"/>
                </IconButton>
            </Toolbar>
        </AppBar>

    );
};

export default Header;

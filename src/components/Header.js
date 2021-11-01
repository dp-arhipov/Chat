import React, {Fragment, useContext} from 'react';
import {AppBar, IconButton, Typography} from '@mui/material';
import * as API from "../API"
import {ChatContext} from "../context";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Toolbar from "@mui/material/Toolbar";
import {AccountCircle} from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ModalUserProfile from "./ModalUserProfile";

const Header = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const logOutButtonHandler = () => {
        API.logOut();
    }
    const {currentUser} = useContext(ChatContext);
    return (
        <Fragment>
            <AppBar position="static">
                <Toolbar>
                    {/*<img src={avatar} alt="Avatar"/>*/}
                    <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
                        AMessanger
                    </Typography>
                    <Typography variant="h6" component="div" onClick={handleOpen} sx={{cursor:"pointer"}}>
                        {currentUser.name}
                    </Typography>
                    <IconButton color="inherit" onClick={handleOpen}>
                        <AccountCircle/>
                    </IconButton>

                    <IconButton color="inherit" onClick={logOutButtonHandler}>
                        <LogoutRoundedIcon fontSize="medium"/>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <ModalUserProfile handleClose={handleClose} handleOpen={handleOpen} open={open}/>
        </Fragment>

    );
};

export default Header;

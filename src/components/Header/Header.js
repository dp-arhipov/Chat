import React, {Fragment, useContext} from 'react';
import {AppBar, IconButton, Typography} from '@mui/material';

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Toolbar from "@mui/material/Toolbar";
import {AccountCircle} from "@mui/icons-material";
import UserProfileModal from "./UserProfileModal";

import {logOut} from "../../store/actions"
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import * as selectors from "../../store/selectors";

const Header = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();

    const logOutButtonHandler = () => {
        // API.logOutStore();
        dispatch(logOut());

    }
    // const currentUser = store.getState().currentUser;
    const currentUserName = useSelector(selectors.currentUserName);
    return (
            <AppBar position="static">
                <Toolbar>
                    {/*<img src={avatar} alt="Avatar"/>*/}
                    <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
                        AMessanger
                    </Typography>
                    <Typography variant="h6" component="div" onClick={handleOpen} sx={{cursor:"pointer"}}>
                        {currentUserName}
                    </Typography>
                    <IconButton color="inherit" onClick={handleOpen}>
                        <AccountCircle/>
                    </IconButton>

                    <IconButton color="inherit" onClick={logOutButtonHandler}>
                        <LogoutRoundedIcon fontSize="medium"/>
                    </IconButton>
                </Toolbar>
                <UserProfileModal handleClose={handleClose} handleOpen={handleOpen} open={open}/>
            </AppBar>
    );
};

export default Header;

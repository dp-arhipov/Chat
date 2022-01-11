import React, {Fragment, useState} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import UserProfile from "./UserProfile";

const ModalUserProfile = ({open,handleClose}) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '0px solid #000',
        boxShadow: 24,
        p: 5,

    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <UserProfile/>
            </Box>
        </Modal>
    );
};

export default ModalUserProfile;
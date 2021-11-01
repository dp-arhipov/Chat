import React, {Fragment, useContext, useState} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {AuthContext} from "../context";
import Button from "@mui/material/Button";
import * as API from "../API"

const UserProfile = () => {
    const {currentUser} = useContext(AuthContext);
    const [nickName, setNickName] = useState('');
    const handleForm = async(e) => {
       e.preventDefault();
        setNickName(e.target.value);
        setNickName('');
        API.setNickName(currentUser, nickName);
    }

    return (
        <Fragment>
            <Typography>
                {currentUser.name}
            </Typography>

            <Box component="form" onSubmit={handleForm}>
                <TextField
                    value ={nickName}
                    onChange={e=>setNickName(e.target.value)}

                />
                <Button type={"submit"}>Отправить</Button>
            </Box>
        </Fragment>
    );
};

export default UserProfile;
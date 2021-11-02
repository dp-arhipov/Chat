import React, {Fragment, useContext, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {AuthContext} from "../context";
import Button from "@mui/material/Button";
import * as API from "../API"
import FormControl from "@mui/material/FormControl";

const UserProfile = () => {
    const {currentUser} = useContext(AuthContext);
    const [nickName, setNickName] = useState('');
    const [nickNameIsBusy, setNickNameIsBusy] = useState(false);
    const handleForm = async (e) => {
        e.preventDefault();
        // let nickName = e.target.value;
        // setNickName(nick);
        // setNickName('');

        if (!await API.find(nickName)) {API.changeNickName(nickName); setNickNameIsBusy(false)}
        else setNickNameIsBusy(true);
    }
    useEffect( () => {

    })

    return (
        <Fragment>
            <Typography>
                {currentUser.name}
            </Typography>

            <FormControl onSubmit={handleForm} m={'100px'}>
                <TextField label="Никнейм" variant="outlined" value={nickName}
                           onChange={e => setNickName(e.target.value)}
                           error={nickNameIsBusy}
                           helperText={(nickNameIsBusy)?"Никнейм занят":''}
                />
                <TextField label="Имя" variant="outlined" />
                <Button type={"submit"}>Сохранить</Button>
            </FormControl>
        </Fragment>
    );
};

export default UserProfile;
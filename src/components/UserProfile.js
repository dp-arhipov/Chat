import React, {Fragment, useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import validator from 'validator'

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import {changeCurrentUserName, changeCurrentUserNickName, isNickNameBusy} from '../store/actions'

import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../store/selectors"
import Stack from "@mui/material/Stack";

const UserProfile = () => {
    const currentUserName = useSelector(selectors.currentUserName);
    const currentUserNickName = useSelector(selectors.currentUserNickName);

    const [nickName, setNickName] = useState(currentUserNickName);
    const [name, setName] = useState(currentUserName);

    const [nickNameIsBusy, setNickNameIsBusy] = useState(false);
    const [wrongName, setWrongName] = useState(false);
    const dispatch = useDispatch();


    const handleForm = async (e) => {
        e.preventDefault();
        if (!(name == currentUserName)) {

            const nameIsWrong = !validator.isLength(name, {min: 1, max: 30});
            setWrongName(nameIsWrong)
            if (!nameIsWrong) {
                dispatch(changeCurrentUserName(name))
            }
        }

        if (!(nickName == currentUserNickName)) {
            setNickNameIsBusy(await isNickNameBusy(nickName));

            if (!nickNameIsBusy) {
                dispatch(changeCurrentUserNickName(nickName));
            }
        }
    }


    return (
        <Fragment>

            <FormControl sx={{width: '100%'}}>
                <Stack direction="column" spacing={3}>
                    <TextField label="Никнейм"
                               id="filled-basic" variant="filled"
                               defaultValue={nickName}

                               onChange={e => setNickName(e.target.value)}
                               error={nickNameIsBusy}
                               helperText={(nickNameIsBusy) ? "Никнейм занят" : ''}
                    />
                    <TextField label="Имя"
                               id="filled-basic" variant="filled"

                               defaultValue={name}
                               onChange={e => setName(e.target.value)}
                               error={wrongName}
                               helperText={(wrongName) ? "Имя должно быть длиннее 1 символа и короче 30 " : ''}
                    />
                    <Button variant="contained" type="submit" size="large" onClick={handleForm}>Сохранить</Button>
                </Stack>
            </FormControl>
        </Fragment>
    );
};

export default UserProfile;
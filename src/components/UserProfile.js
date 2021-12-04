import React, {Fragment, useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import {changeCurrentUserName, changeCurrentUserNickName, isNickNameBusy} from '../store/actions'

import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../store/selectors"

const UserProfile = () => {
    const currentUserName = useSelector(selectors.currentUserName);
    const currentUserNickName = useSelector(selectors.currentUserNickName);

    const [nickName, setNickName] = useState('');
    const [name, setName] = useState('');

    const [nickNameIsBusy, setNickNameIsBusy] = useState(false);
    const [wrongName, setWrongName] = useState(false);
    const dispatch = useDispatch();

    // const [memArr, setMemArr] = useState('');
    // useEffect(()=>{
    //     setMemArr(rand(10000));
    //
    // },[])
    //
    // const rand = (max) => {
    //     let arr = [];
    //     for (let i = 0; i < max; i++) {
    //         arr[i] = getRndInteger(0,10);
    //     }
    // }
    //
    // const getRndInteger = (min, max) => {
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    const handleForm = async (e) => {
        //console.log(memArr);
        e.preventDefault();
        dispatch(changeCurrentUserName(name));

        if (!await isNickNameBusy(nickName)) {
            setNickNameIsBusy(false)
            dispatch(changeCurrentUserNickName(nickName));
        } else setNickNameIsBusy(true);
    }


    return (
        <Fragment>
            <Typography>
                {currentUserName}
            </Typography>

            <FormControl onSubmit={() => console.log("df")} m={'100px'}>
                <TextField label="Никнейм" variant="outlined" value={nickName} m={'20px'}
                           onChange={e => setNickName(e.target.value)}
                           error={nickNameIsBusy}
                           helperText={(nickNameIsBusy) ? "Никнейм занят" : ''}
                />
                <TextField label="Имя" variant="outlined" m={'20px'}
                           value={name}
                           onChange={e => setName(e.target.value)}
                           error={wrongName}
                           helperText={(wrongName) ? "Неверный формат имени " : ''}
                />
                <Button type="submit" onClick={handleForm}>Сохранить</Button>
            </FormControl>
        </Fragment>
    );
};

export default UserProfile;
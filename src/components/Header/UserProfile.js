import React, {Fragment, useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import validator from 'validator'

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import {changeCurrentUserName, changeCurrentUserNickName, emailSignUp, isNickNameBusy} from '../../store/actions'

import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../../store/selectors"
import Stack from "@mui/material/Stack";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const UserProfile = ({handleClose}) => {
    const currentUserName = useSelector(selectors.currentUserName);
    const currentUserNickName = useSelector(selectors.currentUserNickName);

    const [nickName, setNickName] = useState(currentUserNickName);
    const [name, setName] = useState(currentUserName);

    const [nickNameIsBusy, setNickNameIsBusy] = useState(false);
    const [wrongName, setWrongName] = useState(false);
    const dispatch = useDispatch();


    const schema = yup.object({
        name: yup.string().min(6, 'введите больше 6 символов').required('это поле нужно заполнить'),
        nickName: yup.string().min(6, 'введите больше 6 символов').required('это поле нужно заполнить'),
    }).required();

    const {register, handleSubmit, setError, formState: {errors}} = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });


    const handleForm = async (data) => {
        if ((data.nickName == currentUserNickName) && (data.name == currentUserName)) {
            handleClose()
        }
        if(data.name != currentUserName){
            if (data.name!='Избранное') {
                dispatch(changeCurrentUserNickName(data.nickName))
                handleClose()
            }else{
                setError("name", {
                    type: 'custom',
                    message: "запрещенное имя"
                });

            }
        }


        if (data.nickName != currentUserNickName){
            const nickNameIsBusy =  await isNickNameBusy(data.nickName);
            if (nickNameIsBusy) {
                setError("nickName", {
                    type: 'custom',
                    message: "никнейм занят"
                });
            }else{
                dispatch(changeCurrentUserNickName(data.nickName))
                handleClose()
            }
        }
    }


    return (
        <Fragment>
            <form sx={{width: '100%'}}  onSubmit={handleSubmit(handleForm)}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                    <Typography variant={'h6'} sx={{flex: "1", textAlign: 'center'}}>
                        Настройки
                    </Typography>
                    <TextField
                        {...register("nickName")}
                        label="Никнейм"
                        defaultValue={nickName}
                        error={errors.nickName}
                        helperText={errors?.nickName?.message}
                        noValidate
                    />
                    <TextField
                        {...register("name")}
                        label="Имя"
                        defaultValue={name}
                        error={errors.name}
                        helperText={errors?.name?.message}
                        noValidate
                    />
                    <Button variant="contained" type="submit" size="large" >Сохранить</Button>
                </Box>
            </form>
        </Fragment>
    );
};

export default UserProfile;
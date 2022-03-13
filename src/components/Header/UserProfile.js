import React, {Fragment, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentUserNickName, changeCurrentUserName, isNickNameBusy} from '../../store/actions'
import * as selectors from "../../store/selectors"

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import {string, object} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";


const UserProfile = ({handleClose}) => {
    const currentUserName = useSelector(selectors.currentUserName);
    const currentUserNickName = useSelector(selectors.currentUserNickName);

    const dispatch = useDispatch();

    const schema = object({
        name: string().min(6, 'введите больше 6 символов').required('это поле нужно заполнить'),
        nickName: string().min(6, 'введите больше 6 символов').required('это поле нужно заполнить'),
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
                dispatch(changeCurrentUserName(data.name))
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
                        defaultValue={currentUserNickName}
                        error={errors.nickName}
                        helperText={errors?.nickName?.message}
                        noValidate
                    />
                    <TextField
                        {...register("name")}
                        label="Имя"
                        defaultValue={currentUserName}
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
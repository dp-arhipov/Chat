import React, {Fragment, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {emailLogin, googleLogIn, emailSignUp} from "../store/actions"
import {isCurrentUserLoggedIn} from "../store/selectors";
import {Redirect} from "react-router-dom";


import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';

import FlexCenter from "./FlexCenter";
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {faGoogle} from '@fortawesome/free-brands-svg-icons/faGoogle';

import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {string, object} from "yup";

const Login = ({history}) => {
    const dispatch = useDispatch();
    const _isCurrentUserLoggedIn = useSelector(isCurrentUserLoggedIn);

    const googleLoginHandler = useCallback(
        async event => {
            event.preventDefault();
            try {
                await dispatch(googleLogIn());
                
            } catch (error) {
                console.log(error);
            }
        },
        [history]
    );

    const schema = object({
        email: string().email('это не email').required('это поле нужно заполнить'),
        password: string().min(6, 'введите больше 6 символов').required('это поле нужно заполнить'),
    }).required();

    const {register, handleSubmit, setError, formState: {errors}} = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });


    const emailLoginHandler = async (data) => {
        const responce = await dispatch(emailLogin(data.email, data.password));

        if (responce && responce.code == 'auth/user-not-found') {
            setError("email", {
                type: 'server',
                message: "такого пользователя не существует"
            });

        }
        if (responce && responce.code == 'auth/wrong-password') {
            setError("password", {
                type: 'custom',
                message: "пароль неправильный"
            });
        }
        if (responce && responce.code == 'auth/too-many-requests') {
            setError("email", {
                type: 'custom',
                message: "слишком много попыток входа"
            });
        }
    }

    const emailSignUpHandler = async (data) => {
        const responce = await dispatch(emailSignUp(data.email, data.password));
        if (responce && responce.code == 'auth/email-already-in-use') {
            setError("email", {
                type: 'custom',
                message: "такой пользователь уже существует"
            });
        }
    }

    if (_isCurrentUserLoggedIn) {
        return <Redirect to="/"/>;
    }


    return (
        <Fragment>
            <FlexCenter height='100vh'>
                <Box sx={{display: 'flex', flexDirection: 'column', width: '20%', minWidth: '300px'}}>
                    <Typography variant={'h4'} sx={{flex: "1", textAlign: 'center', marginBottom: '5rem'}}>
                        Вход/Регистрация</Typography>
                    <form>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                            <TextField
                                {...register("email")}
                                label="email"
                                error={errors.email}
                                helperText={errors?.email?.message}
                                fullWidth
                                noValidate
                            />
                            <TextField
                                {...register("password")}
                                label="пароль"
                                error={errors.password}
                                helperText={errors?.password?.message}
                                fullWidth
                                noValidate
                                sx={{marginBottom: '2rem'}}
                            />

                            <Button variant="contained" size="large" onClick={handleSubmit(emailLoginHandler)}>
                                Войти
                            </Button>
                            <Button variant="contained" size="large" onClick={handleSubmit(emailSignUpHandler)}>
                                Зарегистрироваться
                            </Button>

                            <Button variant="contained" size="large" onClick={googleLoginHandler}
                                    startIcon={<GoogleIcon/>}>
                                +
                            </Button>
                        </Box>
                    </form>
                </Box>
            </FlexCenter>
        </Fragment>
    );
};

export default Login;
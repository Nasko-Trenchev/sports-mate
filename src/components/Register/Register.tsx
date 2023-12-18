import { Stack, TextField, Typography, Button, FormControl, InputAdornment, OutlinedInput, InputLabel, IconButton, FormHelperText } from '@mui/material';
import { useState } from 'react';
import { useNavigate, NavLink, useLoaderData } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { UserAuth } from '../../contexts/AuthContext';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { usersProfiles } from '../../pages/RegisterPage';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useNotification from '../../hooks/useNotification';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarAlert } from '../Alert/Alert';

import styles from './Register.module.css';

const formInputInitialValue = {
    email: '',
    password: '',
    rePassword: '',
    username: ''
}

export const Register = () => {
    const [formInput, setformInput] = useState(formInputInitialValue);

    const [formError, setFormError] = useState({
        email: false,
        emailTaken: false,
        username: false,
        password: false,
        rePassword: false
    })

    const [showPassword, setShowPassword] = useState(false);
    const { openNotification, closeNotification, actionOption } = useNotification();

    const users = useLoaderData() as usersProfiles;

    const { createUser } = UserAuth();
    const navigate = useNavigate();

    const onUserInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setformInput(oldData => ({
            ...oldData,
            [e.target.name]: e.target.value
        }))
    }

    const onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setFormError(oldData => ({
            ...oldData,
            [e.target.name]: false
        }))
    }

    const onEmailInputFocus = () => {
        setFormError(oldData => ({
            ...oldData,
            'email': false,
            'emailTaken': false,
        }))
    }

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {

        const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formInput.email);
        const validUsername = formInput.username.length >= 3 && formInput.username.length < 15;
        const validPassword = formInput.password.length > 6
        const passwordMatch = formInput.password === formInput.rePassword;
        const userNameTaken = users.some(x => x.username === formInput.username)
        if (!validEmail || !validUsername || !validPassword || !passwordMatch || userNameTaken) {
            if (!validEmail) {
                setFormError((prev) => ({
                    ...prev,
                    email: true
                }))
            }
            if (!validUsername || userNameTaken) {
                setFormError((prev) => ({
                    ...prev,
                    username: true
                }))
            }
            if (!validPassword) {
                setFormError((prev) => ({
                    ...prev,
                    password: true
                }))
            }
            if (!passwordMatch) {
                setFormError((prev) => ({
                    ...prev,
                    rePassword: true
                }))
            }
            return;
        }

        try {
            await createUser(formInput.email, formInput.password, formInput.username)
            await setDoc(doc(db, "users", `${formInput.username}`), {
                username: formInput.username,
                email: formInput.email,
                GamesPlayed: [],
                votes: 0,
                rating: 0,
            });
            navigate('/');
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('auth/email-already-in-use')) {
                    setFormError((prev) => ({
                        ...prev,
                        emailTaken: true
                    }))
                }
                else {
                    setformInput(formInputInitialValue)
                    openNotification("Server error, please try again later", 'error')
                }
            }
        }
    }

    return (
        <StyledEngineProvider injectFirst>
            <Stack spacing={3} className={styles['login-form']}>
                <Typography variant='h1'>Register</Typography>
                <FormControl size='small' sx={{ gap: '0.7em' }}>
                    <TextField
                        label='E-mail'
                        error={formError.email}
                        helperText={
                            formError.emailTaken ? <span style={{ color: '#d32f2f' }}>Email already in use</span> :
                                formError.email ? "Accepted format: example@gmail.com" :
                                    "Please type in your E-mail"}
                        name='email'
                        variant='outlined'
                        size='small'
                        autoFocus
                        required
                        value={formInput.email}
                        onChange={onUserInput}
                        onFocus={onEmailInputFocus}
                    />
                    <TextField
                        label='Username'
                        error={formError.username}
                        helperText={formError.username ?
                            formInput.username.length < 3 ? "Username should be at least 3 characters long" : "Username taken"
                            : "Please type in your username"}
                        name='username'
                        variant='outlined'
                        size='small'
                        required
                        value={formInput.username}
                        onChange={onUserInput}
                        onFocus={onInputFocus}
                    />
                    <FormControl size='small'>
                        <InputLabel style={formError.password ? { color: '#d32f2f' } : {}} htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={formInput.password}
                            onChange={onUserInput}
                            onFocus={onInputFocus}
                            label="Password"
                            name='password'
                            error={formError.password}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText style={formError.password ? { color: '#d32f2f' } : {}}>
                            {formError.password ? "Password should be at least 6 characters long" : "Do not share this with anyone"}
                        </FormHelperText>
                    </FormControl>
                    <FormControl size='small'>
                        <InputLabel htmlFor="outlined-adornment-password2" style={formError.rePassword ? { color: '#d32f2f' } : {}}>Repeat Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password2"
                            type={showPassword ? 'text' : 'password'}
                            value={formInput.rePassword}
                            onChange={onUserInput}
                            onFocus={onInputFocus}
                            label='RepeatPassword'
                            name='rePassword'
                            error={formError.rePassword}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText style={formError.rePassword ? { color: '#d32f2f' } : {}}>
                            {formError.rePassword ? "Passwords missmatch" : "Please type your password again"}
                        </FormHelperText>
                    </FormControl>
                    <Button variant='contained' size='medium' onClick={onSubmit}>Register</Button>
                    <NavLink to='/passwordReset'>Forgot your password?</NavLink>
                </FormControl>
            </Stack>
            <Snackbar
                open={actionOption.open}
                autoHideDuration={4000}
                onClose={closeNotification}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
            >
                <SnackbarAlert onClose={closeNotification} severity={actionOption.color}>
                    {actionOption.message}
                </SnackbarAlert>
            </Snackbar>
        </StyledEngineProvider >
    )
}
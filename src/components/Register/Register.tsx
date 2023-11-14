import { Stack, TextField, Typography, Button, FormControl, InputAdornment, OutlinedInput, InputLabel, IconButton, FormHelperText } from '@mui/material';
import { useState } from 'react';
import { useNavigate, NavLink, useLoaderData } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { UserAuth } from '../../contexts/UserContext';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { User, getAuth, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { usersProfiles } from '../../pages/RegisterPage';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import styles from './Register.module.css';

export const Register = () => {
    const [formInput, setformInput] = useState({
        email: '',
        password: '',
        rePassword: '',
        username: ''
    });

    const [formError, setFormError] = useState({
        email: false,
        username: false,
        password: false,
        rePassword: false
    })

    const [showPassword, setShowPassword] = useState(false);

    const users = useLoaderData() as usersProfiles;

    const { user } = UserAuth();

    const email = user?.email;
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
            console.log(error)
        }
    }

    const onEmailVerification = () => {
        const auth = getAuth();
        sendEmailVerification(auth.currentUser as User)
            .then(() => {
                // Email verification sent!
                // ...
            });
    }

    const passwordReset = () => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email as string)
            .then(() => {
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    }

    return (
        <StyledEngineProvider injectFirst>
            <Stack spacing={3} className={styles['login-form']}>
                <Typography variant='h1'>Register</Typography>
                <FormControl size='small' sx={{ gap: '0.7em' }}>
                    <TextField
                        label='E-mail'
                        error={formError.email}
                        helperText={formError.email ? "Accepted format: example@gmail.com" : "Please type in your E-mail"}
                        name='email'
                        variant='outlined'
                        size='small'
                        autoFocus
                        required
                        value={formInput.email}
                        onChange={onUserInput}
                        onFocus={onInputFocus}
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
                            // value={formInput.password as string}
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
                    {/* <TextField
                        label='Password'
                        error={formError.password}
                        helperText={formError.password ? "Password should be at least 6 characters long" : "Do not share this with anyone"}
                        name='password'
                        type='password'
                        size='small'
                        required value={null}
                        onChange={onUserInput}
                        onFocus={onInputFocus}
                    />
                    <TextField
                        label='Repeat Password'
                        error={formError.rePassword}
                        helperText={formError.rePassword ? "Passwords missmatch" : "Please type your password again"}
                        name='rePassword'
                        type='password'
                        size='small'
                        required value={null}
                        onChange={onUserInput}
                        onFocus={onInputFocus}
                    /> */}
                    <Button variant='contained' size='medium' onClick={onSubmit}>Register</Button>
                    {/* <Button variant='contained' size='medium' onClick={onEmailVerification}>Verify</Button> */}
                    <NavLink to='/passwordReset'>Forgot your password?</NavLink>
                    {/* <Button variant='contained' size='medium' onClick={passwordReset}>Reset password</Button> */}
                </FormControl>
            </Stack>
        </StyledEngineProvider>
    )
}
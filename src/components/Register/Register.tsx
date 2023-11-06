import { Stack, TextField, Typography, Button, FormControl } from '@mui/material';
import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { UserAuth } from '../../contexts/UserContext';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { User, getAuth, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";

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

    const { user } = UserAuth();

    const email = user?.email;
    const { createUser } = UserAuth();
    const navigate = useNavigate();

    const onUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        if (!validEmail || !validUsername || !validPassword || !passwordMatch) {
            if (!validEmail) {
                setFormError((prev) => ({
                    ...prev,
                    email: true
                }))
            }
            if (!validUsername) {
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
            setformInput({
                email: '',
                password: '',
                rePassword: '',
                username: ''
            })
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
                        helperText={formError.email ? "Email should have format like example@gmail.com" : "Please type in your E-mail"}
                        name='email'
                        variant='outlined'
                        size='small'
                        required value={null}
                        onChange={onUserInput}
                        onFocus={onInputFocus}
                    />
                    <TextField
                        label='Username'
                        error={formError.username}
                        helperText={formError.username ? "Username should be at least 3 characters long" : "Please type in your username"}
                        name='username'
                        variant='outlined'
                        size='small'
                        required value={null}
                        onChange={onUserInput}
                        onFocus={onInputFocus}
                    />
                    <TextField
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
                    />
                    <Button variant='contained' size='medium' onClick={onSubmit}>Register</Button>
                    {/* <Button variant='contained' size='medium' onClick={onEmailVerification}>Verify</Button> */}
                    <NavLink to='/resetPassword'>Forgot your password?</NavLink>
                    {/* <Button variant='contained' size='medium' onClick={passwordReset}>Reset password</Button> */}
                </FormControl>
            </Stack>
        </StyledEngineProvider>
    )
}
import { Stack, TextField, Typography, Button, FormControl } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { UserAuth } from '../../contexts/UserContext';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarAlert } from '../Alert/Alert';
import useNotification from '../../hooks/notification';

import styles from './Login.module.css';

export default function Login() {

    const [formInput, setformInput] = useState({
        email: '',
        password: '',
    });

    const { openNotification, closeNotification, actionOption } = useNotification();

    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let from = params.get("from") || "/";

    const { loginUser } = UserAuth();
    const navigate = useNavigate();

    const onUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setformInput(oldData => ({
            ...oldData,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            await loginUser(formInput.email, formInput.password);
            navigate(`${from}`);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
                if (error.message.includes('auth/invalid')) {
                    openNotification("Invalid login details. Username or password incorrect", 'error')
                }
                else if (error.message.includes('auth/too-many-request')) {
                    openNotification("Access temporairly disabled due to many failed login attempts. Please change your password or try again later", 'error')
                }
                else {
                    openNotification("Login temporairly unavailable, please try again later", 'error')
                }
            }
            setformInput({
                email: '',
                password: '',
            })
        }
    }

    return (
        <StyledEngineProvider injectFirst>
            <Stack spacing={3} className={styles['login-form']}>
                <Typography variant='h1'>Login</Typography>
                <FormControl sx={{ gap: '1em' }}>
                    <TextField
                        label='E-mail'
                        helperText="Please type in your password"
                        name='email'
                        variant='outlined'
                        size='small'
                        required
                        value={formInput.email}
                        autoFocus
                        onChange={onUserInput}
                    />
                    <TextField
                        label='Password'
                        helperText="Do not share this with anyone"
                        name='password'
                        type='password'
                        size='small'
                        required
                        value={formInput.password}
                        onChange={onUserInput}
                    />
                    <Button variant='contained' size='medium' onClick={onSubmit}>Login</Button>
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
        </StyledEngineProvider>
    )
}
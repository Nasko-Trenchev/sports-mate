import { Stack, TextField, Typography, Button, FormControl, Snackbar } from '@mui/material';
import { useState } from 'react';
import useNotification from '../../hooks/notification';
import { StyledEngineProvider } from '@mui/material/styles';
import { getAuth, sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";
import { SnackbarAlert } from '../Alert/Alert';
import classes from './PasswordReset.module.css';


export const PasswordReset = () => {
    const [formInput, setformInput] = useState("");

    const { openNotification, closeNotification, actionOption } = useNotification();

    const passwordReset = () => {
        const auth = getAuth()
        sendPasswordResetEmail(auth, formInput)
            .then(() => {
                // confirmPasswordReset(auth, )
                openNotification("Password reset email sent! Please check your email", 'success');
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorMessage.includes("auth/user-not-found")) {
                    openNotification("There is no account related with this email!", 'error');
                }
                else if (errorMessage.includes("auth/invalid-email")) {
                    openNotification("Invalid email!", 'error')
                }
                else if (errorMessage.includes("auth/missing-email")) {
                    openNotification("Plase type in your email!", 'error');
                }
                else {
                    return
                }
                // ..
            });
    }

    // const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    //     if (reason === 'clickaway') {
    //         return
    //     }
    //     setOpen(false);
    // }

    return (
        <StyledEngineProvider injectFirst>
            <Stack spacing={3} className={classes['login-form']}>
                <Typography variant='h1'>Enter your email</Typography>
                <FormControl>
                    <TextField
                        label='E-mail'
                        name='email'
                        variant='outlined'
                        size='small'
                        required
                        onChange={(e) => setformInput(e.target.value)}
                    />
                    <Button variant='contained' size='medium' onClick={passwordReset} className={classes['resetBtn']}>Reset password</Button>
                    <Snackbar
                        open={actionOption.open}
                        autoHideDuration={3000}
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
                </FormControl>
            </Stack>
        </StyledEngineProvider>
    )
}

export default PasswordReset;
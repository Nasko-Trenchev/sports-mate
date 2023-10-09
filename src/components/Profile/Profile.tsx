import classes from './Profile.module.css';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarAlert } from '../Alert/Alert';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { useRef } from 'react';
import useNotification from '../../hooks/notification';


const Profile = () => {

    const newPassword = useRef<HTMLInputElement | null>(null);
    const { openNotification, closeNotification, actionOption } = useNotification();

    const auth = getAuth();

    const user = auth.currentUser!;


    const handlePasswordReset = () => {

        updatePassword(user, newPassword.current?.value as string).then(() => {
            // Update successful.
            openNotification("Password was changed successfully", 'success');
        }).catch((error) => {
            // An error ocurred
            // ...

            const userProvidedPassword = prompt("Please type in your old password again")

            const credential = EmailAuthProvider.credential(
                user?.email!,
                userProvidedPassword!
            )

            reauthenticateWithCredential(user, credential)
                .then(result => {
                    openNotification("You`re now able to change your password", 'success');
                    // User successfully reauthenticated. New ID tokens should be valid.
                }).catch((error) => {
                    openNotification("Wrong password, please login and try again!", 'error');
                })
        })
    }

    return (
        <div>
            <h1>Profile name</h1>
            <label htmlFor="password-new">New password</label>
            <input type="text" id="password-new" ref={newPassword} />
            <div>
                <button onClick={handlePasswordReset}>Enter </button>
            </div>
            <Snackbar
                open={actionOption.open}
                autoHideDuration={2000}
                onClose={closeNotification.bind(actionOption.color)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}

            >
                <SnackbarAlert onClose={closeNotification.bind(actionOption.color)} severity={actionOption.color}>
                    {actionOption.message}
                </SnackbarAlert>
            </Snackbar>
        </div>
    )
}

export default Profile;
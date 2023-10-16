import classes from './Profile.module.css';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarAlert } from '../Alert/Alert';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { useEffect, useRef, useState } from 'react';
import { auth } from '../../config/firebase';
import { useRouteLoaderData } from 'react-router-dom';
import useNotification from '../../hooks/notification';
import { profileData } from '../../pages/ProfilePage';
import { storage } from '../../config/firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'


const Profile = () => {

    const [imageUpload, setImageUpload] = useState<File>();
    const [image, setImage] = useState('')

    const newPassword = useRef<HTMLInputElement | null>(null);
    const { openNotification, closeNotification, actionOption } = useNotification();

    const auth = getAuth();
    const data = useRouteLoaderData('profile-data') as profileData;
    const user = auth.currentUser!;

    useEffect(() => {
        const listRef = ref(storage, `ProfileImages/${auth?.currentUser?.email}`);
        getDownloadURL(listRef).then((data) => setImage(data))
    }, [])


    const handleImageInputChange = (event: React.FormEvent) => {
        const files = (event.target as HTMLInputElement).files

        if (files && files.length > 0) {
            setImageUpload(files[0])
        }
    }

    const handleUpload = async () => {
        if (imageUpload === null || imageUpload === undefined) {
            return
        }
        else {
            const imageRef = ref(storage, `ProfileImages/${auth?.currentUser?.email}`)
            await uploadBytes(imageRef, imageUpload)
        }

    }
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
            <h1>{data.username}`s profile</h1>
            <label htmlFor="password-new">New password</label>
            <input type="text" id="password-new" ref={newPassword} />
            <input type="file" onChange={(e) => handleImageInputChange(e)} />
            <button onClick={handleUpload}>Upload image</button>
            <div>
                <img src={image} alt="" />
            </div>
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
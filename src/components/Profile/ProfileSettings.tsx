import classes from './ProfileSettings.module.css'
import Snackbar from '@mui/material/Snackbar';
import { SnackbarAlert } from '../Alert/Alert';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { StyledEngineProvider } from '@mui/material/styles';
import { auth } from '../../config/firebase';
import { useRef, useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import useNotification from '../../hooks/notification';
import { storage } from '../../config/firebase';
import { ref, uploadBytes } from 'firebase/storage'
import { styled } from '@mui/material/styles';
import { ImageTypes } from '../../util/constants';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


const ProfileSettings = () => {

    const [imageUpload, setImageUpload] = useState<File>();
    const { openNotification, closeNotification, actionOption } = useNotification();

    const fileInput = useRef<HTMLInputElement | null>(null);
    const newPassword = useRef<HTMLInputElement | null>(null);


    const handleUpload = async () => {
        if (imageUpload === null || imageUpload === undefined) {
            return
        }
        else {
            const imageRef = ref(storage, `ProfileImages/${auth?.currentUser?.displayName}`)
            setImageUpload(undefined)
            await uploadBytes(imageRef, imageUpload)
            openNotification("Profile image changed successfully", 'success');
        }

    }

    const handleImageInputChange = (event: React.FormEvent) => {

        const files = (event.target as HTMLInputElement).files

        if (files && files.length > 0) {

            const fileExtension = files[0].name.split('.').pop();
            if (ImageTypes.some(extension => extension === fileExtension?.toLowerCase())) {
                setImageUpload(files[0])
            }
            else {
                openNotification(`Unsupported imgage format! Accepted formats: jpg, jpeg, jfif, pjpeg, pjp, png, webp, avif, apng, gif`, 'error');
            }
        }
    }

    const handlePasswordReset = () => {

        updatePassword(auth.currentUser!, newPassword.current?.value as string).then(() => {
            // Update successful.
            openNotification("Password was changed successfully", 'success');
        }).catch((error) => {
            // An error ocurred
            // ...

            const userProvidedPassword = prompt("Please type in your old password again")

            const credential = EmailAuthProvider.credential(
                auth?.currentUser?.email!,
                userProvidedPassword!
            )

            reauthenticateWithCredential(auth.currentUser!, credential)
                .then(result => {
                    openNotification("You`re now able to change your password", 'success');
                    // User successfully reauthenticated. New ID tokens should be valid.
                }).catch((error) => {
                    openNotification("Wrong password, please login and try again!", 'error');
                })
        })
    }
    return <StyledEngineProvider>
        <h1>Profile settings</h1>
        <div className={classes.settingsContainer}>
            <h3>Change profile image</h3>
            {imageUpload &&
                <div className={classes.imagePreviewContainer}>
                    <div className={classes.profileImgContainer}>
                        <img src={URL.createObjectURL(imageUpload)} alt="currentImage" />
                    </div>
                    <div className={classes.deleteAction}>
                        <p>{imageUpload.name}</p>
                        <IconButton sx={{ color: 'red' }}
                            size='small'
                            onClick={() => setImageUpload(undefined)}
                        >
                            <HighlightOffIcon />
                        </IconButton>
                    </div>
                </div>
            }
            <div className={classes.imageUploadContainer}>
                {!imageUpload ?
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput type="file" ref={fileInput} onChange={(e) => handleImageInputChange(e)} />
                    </Button>
                    :
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            size='small'
                            onClick={handleUpload}
                        >
                            Save file
                        </Button>
                    </div>
                }
            </div>
            <h3>Change password</h3>
            <div className={classes.imageUploadContainer}>
                <TextField size='small' type="text" id="password-new" ref={newPassword} placeholder='Enter your new password...' />
            </div>
        </div>
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
}

export default ProfileSettings;
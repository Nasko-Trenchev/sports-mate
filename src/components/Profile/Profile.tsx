import classes from './Profile.module.css';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { StyledEngineProvider } from '@mui/material/styles';
import { auth } from '../../config/firebase';
import { useRef, useState } from 'react';
import { Button, Rating, Box } from '@mui/material';
import { useRouteLoaderData, NavLink } from 'react-router-dom';
import useNotification from '../../hooks/notification';
import { storage } from '../../config/firebase';
import { ref, uploadBytes } from 'firebase/storage'
import { combinedProfileData } from '../../util/sportTypes';


const Profile = () => {

    const [imageUpload, setImageUpload] = useState<File>();
    const newPassword = useRef<HTMLInputElement | null>(null);
    const { openNotification, closeNotification, actionOption } = useNotification();

    const { image, profile } = useRouteLoaderData('profile-data') as combinedProfileData

    const fileInput = useRef<HTMLInputElement | null>(null);
    const ratingValue = Math.round(profile.rating / profile.votes)

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

    return (
        <StyledEngineProvider>
            <div className={classes.profileHeader}>
                <div className={classes.profileImgContainer}>
                    <img src={image} alt="profilePicture" />
                </div>
                <h1>{profile.username}</h1>
            </div>
            <div className={classes.profileContainer}>
                <div>
                    <p>Total events attended: {profile.GamesPlayed.length}</p>
                    <div className={classes.ratingSection}>
                        <h2>Your rating:</h2>
                        <div className={classes.ratingFlexContainer}>
                            <Rating
                                size='small'
                                sx={{ alignItems: 'center' }}
                                precision={1}
                                readOnly
                                value={ratingValue}
                            />
                            <p>{profile.votes} votes</p>
                        </div>
                    </div>
                </div>
                <Button variant='contained'><NavLink to={'settings'} className={classes['links']}>Settings</NavLink></Button>

                {/* <div>
                    <p>{imageUpload?.name}</p>
                    {!imageUpload ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => fileInput.current!.click()}
                        >
                            upload file
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpload}
                        >
                            Save file
                        </Button>
                    )}



                    <input
                        ref={fileInput}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => handleImageInputChange(e)}
                    />
                </div>
                <label htmlFor="password-new">New password</label>
                <input type="text" id="password-new" ref={newPassword} />
                <input type="file" onChange={(e) => handleImageInputChange(e)} />
                <button onClick={handleUpload}>Upload image</button>
                <div>
                    <button onClick={handlePasswordReset}>Enter </button>
                </div> */}
            </div>
            {/* <Snackbar
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
            </Snackbar> */}

        </StyledEngineProvider>
    )
}

export default Profile;
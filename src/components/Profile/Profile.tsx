import classes from './Profile.module.css';
import { StyledEngineProvider } from '@mui/material/styles';
import { Button, Rating } from '@mui/material';
import { useRouteLoaderData, NavLink } from 'react-router-dom';
import { combinedProfileData } from '../../util/sportTypes';
import CreateButton from '../CreateButton/CreateButton';


const Profile = () => {

    const { image, profile } = useRouteLoaderData('profile-data') as combinedProfileData

    const ratingValue = Math.round(profile.rating / profile.votes)

    const pendingGames = profile.GamesPlayed.filter(x => x.HasRated === false).length;

    return (
        <StyledEngineProvider>
            {pendingGames > 0 &&
                <div>
                    <h1>You have {pendingGames} pending completion {pendingGames > 1 ? "games" : "game"}</h1>
                    <CreateButton style='empty' text='Go to complete page' path={`profile/complete`} />
                </div>
            }
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
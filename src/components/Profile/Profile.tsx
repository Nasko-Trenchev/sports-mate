import classes from './Profile.module.css';
import { StyledEngineProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import { useRouteLoaderData, NavLink } from 'react-router-dom';
import { combinedProfileData } from '../../util/sportTypes';
import CreateButton from '../CreateButton/CreateButton';


const Profile = () => {

    const { image, profile } = useRouteLoaderData('profile-data') as combinedProfileData

    const pendingGames = profile.pendingCompletionGames;

    return (
        <StyledEngineProvider>
            {pendingGames.length > 0 &&
                <div>
                    <h1>You have {pendingGames.length} pending completion {pendingGames.length > 1 ? "games" : "game"}</h1>
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
                    <p>Total events attended: {profile.pastGameIds.length}</p>
                    <div className={classes.ratingSection}>
                        <h2>Your rating:</h2>
                        <div className={classes.ratingFlexContainer}>
                        </div>
                    </div>
                </div>
                <Button variant='contained'><NavLink to={'settings'} className={classes['links']}>Settings</NavLink></Button>
            </div>

        </StyledEngineProvider>
    )
}

export default Profile;
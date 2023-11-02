import classes from './CompleteEventSteps.module.css'
import { useRouteLoaderData } from "react-router-dom";
import { ListItemSecondaryAction } from '@mui/material';
import { loaderReturnArgs } from "../../pages/GameDetailsPage";
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Rating } from '@mui/lab';
import Avatar from '@mui/material/Avatar';
import { StyledEngineProvider } from '@mui/material/styles';

const CompleteEventSteps: React.FC<{ step: number }> = (props) => {

    const { sportDetails, users } = useRouteLoaderData('game-details') as loaderReturnArgs;

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    if (props.step === 0) {
        return (
            <StyledEngineProvider>
                <h3>Please mark the attendance of the players</h3>
                <div className={classes.players}>
                    {users.map((user) =>
                        <List className={classes.playerProfileContainer}>
                            <ListItem >
                                <ListItemAvatar>
                                    <div >
                                        <Avatar alt={user.users.username} src={user.image} />
                                    </div>

                                </ListItemAvatar>
                                <ListItemText sx={{ flex: '70%' }}
                                    primary={user.users.username}
                                />
                                <ListItemSecondaryAction >
                                    <Checkbox {...label} defaultChecked />
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    )}
                </div>
            </StyledEngineProvider>
        )
    }
    else if (props.step === 1) {
        return (
            <StyledEngineProvider>
                <h3>Please rate the performance of the players</h3>
                <div className={classes.players}>
                    {users.map((user) =>
                        <List className={classes.playersRatingContainer}>
                            <ListItem >
                                <ListItemAvatar>
                                    <div >
                                        <Avatar alt={user.users.username} src={user.image} />
                                    </div>

                                </ListItemAvatar>
                                <ListItemText sx={{ flex: '70%' }}
                                    primary={user.users.username}
                                />
                                <ListItemSecondaryAction className={classes.rating} >
                                    <Rating
                                        size='small'
                                        readOnly
                                        precision={0.5}
                                        value={5}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    )}
                </div>
            </StyledEngineProvider>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}

export default CompleteEventSteps;
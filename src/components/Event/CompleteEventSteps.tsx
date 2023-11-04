import classes from './CompleteEventSteps.module.css'
import { useRouteLoaderData } from "react-router-dom";
import { ListItemSecondaryAction } from '@mui/material';
import { loaderReturnArgs } from "../../pages/GameDetailsPage";
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Rating } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import { StyledEngineProvider } from '@mui/material/styles';

type StepsProps = {
    step: number,
    handlePresenceChange: (e: SelectChangeEvent<any>) => void
    handleRatingChange: (e: React.SyntheticEvent<Element, Event>, value: number | null, user: string) => void
    handleCommentChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const CompleteEventSteps: React.FC<StepsProps> = (props) => {


    const { sportDetails, users } = useRouteLoaderData('game-details') as loaderReturnArgs;

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    if (props.step === 0) {
        return (
            <StyledEngineProvider>
                <h3>Please mark the attendance of the players</h3>
                <div className={classes.players}>
                    {users.map((user) =>
                        <List className={classes.playerProfileContainer} key={user.users.email}>
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
                                    <Checkbox {...label}
                                        name={user.users.username}
                                        defaultChecked
                                        onChange={(e) => props.handlePresenceChange(e)} />
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
                                        name={user.users.username}
                                        precision={1}
                                        onChange={(event, value) => props.handleRatingChange(event, value, user.users.username)}
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
            <StyledEngineProvider>
                <div className={classes.commentSection}>
                    <TextField sx={{ width: "60%" }}
                        id="standard-multiline-static"
                        label="Write your comment about the game"
                        multiline
                        rows={5}
                        variant="standard"
                        onBlur={(e) => props.handleCommentChange(e)}
                    />
                </div>
            </StyledEngineProvider>
        )
    }
}

export default CompleteEventSteps;
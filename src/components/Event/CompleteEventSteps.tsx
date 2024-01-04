import classes from './CompleteEventSteps.module.css'
import { useRouteLoaderData, Await } from "react-router-dom";
import { ListItemSecondaryAction } from '@mui/material';
import { loaderReturnArgs } from "../../pages/GameDetailsPage";
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Rating, CircularProgress } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import { StyledEngineProvider } from '@mui/material/styles';
import { Suspense } from 'react';
import { UserAuth } from '../../contexts/AuthContext';
import { constructedObject } from '../../pages/GameDetailsPage';

type StepsProps = {
    step: number,
    handlePresenceChange: (e: SelectChangeEvent<any>) => void
    handleRatingChange: (e: React.SyntheticEvent<Element, Event>, value: number | null, user: string) => void
    handleCommentChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const CompleteEventSteps: React.FC<StepsProps> = (props) => {

    const { users } = useRouteLoaderData('game-details') as loaderReturnArgs;
    const { user } = UserAuth()
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    if (props.step === 0) {
        return (
            <StyledEngineProvider>
                <h3>Please mark the attendance of the players</h3>
                <div className={classes.players}>
                    <Suspense fallback={<CircularProgress disableShrink sx={{ alignSelf: 'center' }} />}>
                        <Await resolve={users}>
                            {(defferedUsers: constructedObject) => (
                                defferedUsers.filter(entry => entry.username !== user?.displayName).map((user) =>
                                    <List className={classes.playerProfileContainer} key={user.email}>
                                        <ListItem >
                                            <ListItemAvatar>
                                                <div >
                                                    <Avatar alt={user.username} src={user.image} />
                                                </div>
                                            </ListItemAvatar>
                                            <ListItemText sx={{ flex: '70%' }}
                                                primary={user.username}
                                            />
                                            <ListItemSecondaryAction >
                                                <Checkbox {...label}
                                                    name={user.username}
                                                    defaultChecked
                                                    onChange={(e) => props.handlePresenceChange(e)} />
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                )
                            )}
                        </Await>
                    </Suspense>
                </div>
            </StyledEngineProvider>
        )
    }
    else if (props.step === 1) {
        return (
            <StyledEngineProvider>
                <h3>Please rate the performance of the players</h3>
                <div className={classes.players}>
                    <Suspense fallback={<CircularProgress disableShrink sx={{ alignSelf: 'center' }} />}>
                        <Await resolve={users}>
                            {(defferedUsers: constructedObject) => (
                                defferedUsers.filter(entry => entry.username !== user?.displayName).map((user) =>
                                    <List className={classes.playersRatingContainer} key={user.email}>
                                        <ListItem >
                                            <ListItemAvatar>
                                                <div >
                                                    <Avatar alt={user.username} src={user.image} />
                                                </div>

                                            </ListItemAvatar>
                                            <ListItemText sx={{ flex: '70%' }}
                                                primary={user.username}
                                            />
                                            <ListItemSecondaryAction className={classes.rating} >
                                                <Rating
                                                    size='small'
                                                    name={user.username}
                                                    precision={1}
                                                    onChange={(event, value) => props.handleRatingChange(event, value, user.username)}
                                                />
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                ))}
                        </Await>
                    </Suspense>
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
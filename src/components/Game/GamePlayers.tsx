import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { motion } from 'framer-motion';
import { Rating, Tooltip } from '@mui/material';
import { profileData } from '../../pages/ProfilePage';
import { getPalyerLevelAsString } from '../../util/helperFunctions';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import classes from './GamePlayers.module.css'
import { useParams } from 'react-router-dom';
import { getUserRating } from '../../util/helperFunctions';

const GamePlayers: React.FC<{ image: string, displayName: string, date?: string, user: profileData }> = (props) => {

    const navigate = useNavigate();
    const { sport } = useParams();

    const userRating = getUserRating(props.user).find(entry => entry.sport.toLowerCase() === sport);;

    return (
        <List sx={{ width: '100%', bgcolor: `background.paper` }} className={classes.playerProfileContainer} >
            <ListItem alignItems="center">
                <ListItemAvatar sx={{ flex: '30%', display: 'flex', justifyContent: 'center' }}>
                    <motion.div whileHover={{ scale: 1.2 }}>
                        <Avatar onClick={() => navigate(`/publicProfile/${props.displayName}`)} alt={props.displayName} src={props.image} />
                    </motion.div>
                </ListItemAvatar>
                <ListItemText sx={{ flex: '70%' }}
                    primary={props.displayName}
                    secondary={
                        <React.Fragment>
                            <Tooltip
                                title={getPalyerLevelAsString(userRating?.votes, userRating?.rating)}
                                placement="bottom-start"
                                arrow
                                slotProps={{
                                    popper: {
                                        modifiers: [
                                            {
                                                name: 'offset',
                                                options: {
                                                    offset: [-20, -14],
                                                },
                                            },
                                        ],
                                    },
                                }}>
                                <Typography
                                    sx={{ display: 'block' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    <Rating
                                        size='small'
                                        readOnly
                                        precision={1}
                                        value={userRating?.rating}
                                    />
                                </Typography>
                            </Tooltip>

                            <span className={classes.profileDate}>{props.date}</span>
                        </React.Fragment>
                    }
                />
            </ListItem>
        </List >
    );
}

export default GamePlayers;
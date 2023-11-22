import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { motion } from 'framer-motion';
import { Rating } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import classes from './GamePlayers.module.css'

const GamePlayers: React.FC<{ image: string, displayName: string, bgColor: string, date?: string }> = (props) => {

    const navigate = useNavigate();

    return (
        <List sx={{ width: '100%', bgcolor: `${props.bgColor}` }} className={classes.playerProfileContainer} >
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
                            <Typography
                                sx={{ display: 'block' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                <Rating
                                    size='small'
                                    readOnly
                                    precision={0.5}
                                    value={5}
                                />
                            </Typography>
                            <span className={classes.profileDate}>{props.date}</span>
                        </React.Fragment>
                    }
                />
            </ListItem>
        </List >
    );
}

export default GamePlayers;
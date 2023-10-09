import classes from './Game.module.css';
import { Timestamp } from "firebase/firestore"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarsIcon from '@mui/icons-material/Stars';
import ThreePIcon from '@mui/icons-material/ThreeP';
import { motion } from 'framer-motion'
import { Button } from '@mui/material';
import { Sport } from '../../util/sportTypes';

const Game: React.FC<{
    data: {
        Image: string
        Location: string,
        Owner: string,
        Players: string[],
        SkillLevel: string,
        Time: Timestamp,
        id: string,
    }
}> = (props) => {

    return (
        <div className={classes.game}>
            <div className={classes.imgContainer}>
                <img src={props.data.Image} alt={props.data.id} />
            </div>
            <div className={classes.mainAreas}>
                <div className={classes.flexItem}>
                    <LocationOnIcon />
                    <p>{props.data.Location}</p>
                </div>
                <div className={classes.flexItem}>
                    <AccessTimeIcon />
                    <p>{props.data.Time.toDate().toDateString()}</p>
                </div>
            </div>
            <div className={classes.mainAreas}>
                <div className={classes.flexItem}>
                    <ThreePIcon />
                    <p>{props.data.Owner}</p>
                </div>
                <div className={classes.flexItem}>
                    <StarsIcon />
                    <p>{props.data.SkillLevel}</p>
                </div>
            </div>
            <div>
            </div>
            <div className={classes.gameSpots}>
                <p>7/8 spots filled</p>
            </div>
            <motion.div whileHover={{ scale: 1.1 }}>
                <Button variant='outlined' size='small' sx={{
                    color: 'white', borderColor: 'white', '&:hover': {
                        borderColor: 'gray',
                    }
                }}>Join event</Button>
            </motion.div>
        </div>


    )
}

export default Game;
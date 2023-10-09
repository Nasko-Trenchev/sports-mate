import classes from './Game.module.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarsIcon from '@mui/icons-material/Stars';
import ThreePIcon from '@mui/icons-material/ThreeP';
import { motion } from 'framer-motion'
import { Button } from '@mui/material';

const Game = () => {

    return (
        <div className={classes.game}>
            <div className={classes.imgContainer}>
                <img src="https://t3.ftcdn.net/jpg/00/34/24/96/360_F_34249698_Oun7sm6fNLKUXpAtzgue06sTMyHSxwgB.jpg" alt="1" />
            </div>
            <div className={classes.mainAreas}>
                <div className={classes.flexItem}>
                    <LocationOnIcon />
                    <p>Vasil Levski 30a</p>
                </div>
                <div className={classes.flexItem}>
                    <AccessTimeIcon />
                    <p>10:30 sutrinta na 5-to</p>
                </div>
            </div>
            <div className={classes.mainAreas}>
                <div className={classes.flexItem}>
                    <ThreePIcon />
                    <p>Asen</p>
                </div>
                <div className={classes.flexItem}>
                    <StarsIcon />
                    <p>Masters</p>
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
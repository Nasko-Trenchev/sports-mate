import classes from './Game.module.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarsIcon from '@mui/icons-material/Stars';
import ThreePIcon from '@mui/icons-material/ThreeP';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import { Sport } from '../../util/sportTypes';
import { useParams, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import { hoursLeft } from '../../util/helperFunctions';


const Game: React.FC<{ data: Sport }> = (props) => {

    const params = useParams();
    const navigate = useNavigate()

    console.log(props.data.Time)

    const { timeRemaining } = hoursLeft(props.data.Time.toDate())

    return (
        <>
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
                        <p>{dayjs(props.data.Time.toDate()).format("llll")}</p>
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
                <div className={classes.gameSpots}>
                    <p>{props.data.Players.length}/{props.data.PlayersCount} spots filled</p>
                    <p>{timeRemaining}</p>
                </div>
                <motion.div whileHover={{ scale: 1.1 }} className={classes.detailsBtn}>
                    <Button variant='contained' size='small' onClick={() => navigate(`/${params.sport}/${props.data.id}`)}>Show details</Button>
                </motion.div>
            </div>
        </>
    )
}

export default Game;
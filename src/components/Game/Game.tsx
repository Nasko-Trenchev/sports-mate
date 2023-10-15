import classes from './Game.module.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarsIcon from '@mui/icons-material/Stars';
import ThreePIcon from '@mui/icons-material/ThreeP';
import { motion } from 'framer-motion'
import { Button } from '@mui/material';
import { Sport } from '../../util/sportTypes';
import { UserAuth } from '../../contexts/UserContext';
import { useSubmit, useParams, useNavigate } from "react-router-dom";


const Game: React.FC<{ data: Sport }> = (props) => {

    const { user } = UserAuth();
    const submit = useSubmit();
    const params = useParams();
    const navigate = useNavigate()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!user) {
            navigate("/login")
            return;
        }
        console.log(e.currentTarget.textContent)

        submit({
            action: `${e.currentTarget.textContent}`,
            sport: `${params.sport}`,
            id: `${props.data.id}`,
            user: `${user?.email}`
        }, { method: 'post' })
    }

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
            <div className={classes.gameSpots}>
                <p>{props.data.Players.length}/{props.data.PlayersCount} spots filled</p>
            </div>
            {props.data.Owner === user?.email ?
                <motion.div whileHover={{ scale: 1.1 }} className={classes.detailsBtn}>
                    <Button
                        variant='outlined'
                        size='small'
                        sx={{
                            color: 'white', borderColor: 'white', '&:hover': { borderColor: 'gray' }
                        }}
                    >Cancel event</Button>
                </motion.div>

                :

               <motion.div whileHover={{ scale: 1.1 }} className={classes.detailsBtn}>
                    <Button
                        variant='outlined'
                        size='small'
                        sx={{
                            color: 'white', borderColor: 'white', '&:hover': { borderColor: 'gray' }, '&:disabled': { color: 'red', border: 'none' }
                        }}
                        disabled={props.data.PlayersCount === props.data.Players.length && !props.data.Players.some(email => email === user?.email)}
                        onClick={(e) => handleClick(e)}
                    >{props.data.Players.some(email => email === user?.email) ? "Leave event" :
                        props.data.PlayersCount === props.data.Players.length ? "Full" : "Join event"}</Button>
                </motion.div> 
            }
        </div>
    )
}

export default Game;
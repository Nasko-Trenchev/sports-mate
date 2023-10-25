import classes from './Game.module.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarsIcon from '@mui/icons-material/Stars';
import ThreePIcon from '@mui/icons-material/ThreeP';
import { motion } from 'framer-motion'
import { Button } from '@mui/material';
import { Sport } from '../../util/sportTypes';
import { UserAuth } from '../../contexts/UserContext';
import { useSubmit, useParams, useNavigate, redirect } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import { SnackbarAlert } from '../Alert/Alert';
import AlertDialog from '../Alert/AlertDialog';
import dayjs from 'dayjs';
import useDialog from '../../hooks/dialog';
import useNotification from '../../hooks/notification';
import { hoursLeft } from '../../util/helperFunctions';


const Game: React.FC<{ data: Sport }> = (props) => {

    const submit = useSubmit();
    const params = useParams();
    const { user } = UserAuth();
    const navigate = useNavigate()
    const { openNotification, closeNotification, actionOption } = useNotification();
    const { closeDialog, open, openDialog } = useDialog();

    const { timeRemaining } = hoursLeft(props.data.Time.toDate())


    const handleEventClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!user) {
            navigate("/login")
            return;
        }
        if (e.currentTarget.textContent === "Confirm") {
            openNotification("Event cancelled successfully", 'success');
            redirect(`${params.sport}`)
        }
        submit({
            action: `${e.currentTarget.textContent}`,
            sport: `${params.sport}`,
            id: `${props.data.id}`,
            user: `${user?.email}`
        }, { method: 'post' })
    }

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
                {props.data.Owner === user?.email ?
                    <motion.div whileHover={{ scale: 1.1 }} className={classes.detailsBtn}>
                        <Button
                            variant='outlined'
                            size='small'
                            sx={{
                                color: 'white', borderColor: 'white', '&:hover': { borderColor: 'gray' }
                            }}
                            onClick={openDialog}
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
                            onClick={(e) => handleEventClick(e)}
                        >{props.data.Players.some(email => email === user?.email) ? "Leave event" :
                            props.data.PlayersCount === props.data.Players.length ? "Full" : "Join event"}</Button>
                    </motion.div>

                }
            </div>
            <AlertDialog
                title='Confirm event deletion'
                confirmationText="This action can`t be reverted! You`ll need to create another event if you proceed"
                open={open}
                confirm={(e) => handleEventClick(e)}
                cancel={closeDialog}
            />
            <Snackbar
                open={actionOption.open}
                autoHideDuration={3000}
                onClose={closeNotification.bind(actionOption.color)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
            >
                <SnackbarAlert onClose={closeNotification.bind(actionOption.color)} severity={actionOption.color}>
                    {actionOption.message}
                </SnackbarAlert>
            </Snackbar>

        </>
    )
}

export default Game;
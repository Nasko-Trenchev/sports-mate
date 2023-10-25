import { Button } from "@mui/material";
import { UserAuth } from '../../contexts/UserContext';
import { useRouteLoaderData } from "react-router-dom";
import { Sport } from "../../util/sportTypes";
import { hoursLeft } from "../../util/helperFunctions";
import { motion } from 'framer-motion'
import { useSubmit, useParams, useNavigate, redirect } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import { SnackbarAlert } from '../Alert/Alert';
import AlertDialog from '../Alert/AlertDialog';
import useDialog from '../../hooks/dialog';
import useNotification from '../../hooks/notification';
import { FootballFieldsImage } from "../../util/constants";

import Map from "../GoggleMap/GoogleMap";

import classes from './GameDetails.module.css'

const GameDetails: React.FC = () => {

    const { gameId, sport } = useParams();
    const { user } = UserAuth();
    const navigate = useNavigate()
    const submit = useSubmit();
    const data = useRouteLoaderData('game-details') as Sport;
    const { openNotification, closeNotification, actionOption } = useNotification();
    const { closeDialog, open, openDialog } = useDialog();

    const { timeRemaining } = hoursLeft(data.Time.toDate())

    const mapCoordinates = FootballFieldsImage.find(field => field.location === data.Location)


    const handleEventClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!user) {
            navigate("/login")
            return;
        }
        if (e.currentTarget.textContent === "Confirm") {
            openNotification("Event cancelled successfully", 'success');
        }
        submit({
            action: `${e.currentTarget.textContent}`,
            sport: `${sport}`,
            id: `${data.id}`,
            user: `${user?.email}`
        }, { method: 'post' })
    }
    return (
        <>
            <h1>Event by: {data.Owner}</h1>
            <h2>Time remaining: {timeRemaining}</h2>
            <div className={classes.detailsContainer}>
                <div className={classes.map}>
                    <p>{data.Location}</p>
                    <Map coordinate={mapCoordinates?.coordinates!} />
                </div>
                <div>
                    <p>Players</p>
                    {data.Players.map(player =>
                        <p>{player}</p>
                    )}
                    <p>{data.PlayersCount - data.Players.length} spots remaining</p>
                    {data.Owner === user?.email ?
                        <motion.div whileHover={{ scale: 1.1 }} className={classes.detailsBtn}>
                            <Button
                                variant='outlined'
                                size='small'
                                sx={{
                                    color: 'blue', borderColor: 'blue', '&:hover': { borderColor: 'gray' }
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
                                    color: 'blue', borderColor: 'blue', '&:hover': { borderColor: 'gray' }, '&:disabled': { color: 'red', border: 'none' }
                                }}
                                disabled={data.PlayersCount === data.Players.length && !data.Players.some(email => email === user?.email)}
                                onClick={(e) => handleEventClick(e)}
                            >{data.Players.some(email => email === user?.email) ? "Leave event" :
                                data.PlayersCount === data.Players.length ? "Full" : "Join event"}</Button>
                        </motion.div>
                    }
                </div>
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

export default GameDetails;
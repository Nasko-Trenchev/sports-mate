import { Button } from "@mui/material";
import { UserAuth } from '../../contexts/UserContext';
import { hoursLeft } from "../../util/helperFunctions";
import { motion } from 'framer-motion'
import { useSubmit, useParams, useNavigate, useRouteLoaderData } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import { SnackbarAlert } from '../Alert/Alert';
import AlertDialog from '../Alert/AlertDialog';
import useDialog from '../../hooks/dialog';
import useNotification from '../../hooks/notification';
import { FootballFieldsImage } from "../../util/constants";
import Map from "../GoggleMap/GoogleMap";
import GamePlayers from "./GamePlayers";
import { loaderReturnArgs } from "../../pages/GameDetailsPage";
import classes from './GameDetails.module.css'


const GameDetails: React.FC = () => {

    const { sport } = useParams();
    const { user } = UserAuth();
    const navigate = useNavigate()
    const submit = useSubmit();
    const { sportDetails, users } = useRouteLoaderData('game-details') as loaderReturnArgs;
    const { openNotification, closeNotification, actionOption } = useNotification();
    const { closeDialog, open, openDialog } = useDialog();

    const { timeRemaining } = hoursLeft(sportDetails.Time.toDate())

    const mapCoordinates = FootballFieldsImage.find(field => field.location === sportDetails.Location)

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
            id: `${sportDetails.id}`,
            user: `${user?.email}`
        }, { method: 'post' })
    }

    const handleCompleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        submit({
            action: `${e.currentTarget.textContent}`,
            sport: `${sport}`,
            id: `${sportDetails.id}`,
            user: `${user?.email}`
        }, { method: 'post' })
    }
    return (
        <>
            <h1>Event by: {sportDetails.Owner}</h1>
            <h2>{timeRemaining}</h2>
            <div className={classes.detailsContainer}>
                <div className={classes.map}>
                    <p>{sportDetails.Location}</p>
                    <Map coordinate={mapCoordinates?.coordinates!} />
                </div>
                <div className={classes.playersContainer}>
                    <p>Players</p>
                    <div className={classes.players}>
                        {users.map((user) =>
                            <GamePlayers key={user.users.email} image={user.image} nickname={user.users.username} />
                        )}
                    </div>
                    <p>{sportDetails.PlayersCount - sportDetails.Players.length} spots remaining</p>
                    {sportDetails.Owner === user?.email ?
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
                                disabled={sportDetails.PlayersCount === sportDetails.Players.length && !sportDetails.Players.some(email => email === user?.email)}
                                onClick={(e) => handleEventClick(e)}
                            >{sportDetails.Players.some(email => email === user?.email) ? "Leave event" :
                                sportDetails.PlayersCount === sportDetails.Players.length ? "Full" : "Join event"}</Button>
                        </motion.div>
                    }
                </div>
            </div>
            {(sportDetails.Owner === user?.email && timeRemaining === "Event over") && <Button onClick={handleCompleteClick}>Mark as completed</Button>}
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
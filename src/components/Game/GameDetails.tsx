import { Button } from "@mui/material";
import { UserAuth } from '../../contexts/UserContext';
import { hoursLeft } from "../../util/helperFunctions";
import { color, motion } from 'framer-motion'
import Modal from '@mui/material/Modal';
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
import GameImageContainer from "./GameImageContainer";
import classes from './GameDetails.module.css'
import { useState } from "react";
import Box from "@mui/material/Box";

const GameDetails: React.FC = () => {

    const { sport, gameId } = useParams();
    const { user } = UserAuth();
    const navigate = useNavigate()
    const submit = useSubmit();
    const { sportDetails, users } = useRouteLoaderData('game-details') as loaderReturnArgs;
    const { openNotification, closeNotification, actionOption } = useNotification();
    const { closeDialog, open, openDialog } = useDialog();
    const [showPlayers, setShowPlayers] = useState(false)

    const { timeRemaining, time } = hoursLeft(sportDetails.Time.toDate())

    const fieldDetails = FootballFieldsImage.find(field => field.location === sportDetails.Location)

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
            user: `${user?.displayName}`,
        },
            { method: "post", encType: "application/json" })
    }

    const handleCompleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {

        // submit({
        //     action: `${e.currentTarget.textContent}`,
        //     sport: `${sport}`,
        //     id: `${sportDetails.id}`,
        //     user: `${user?.displayName}`,
        //     game: `${JSON.stringify(sportDetails)}`
        // },
        //     { method: "post", encType: "application/json" })
    }
    return (
        <>
            {(sportDetails.Owner === user?.displayName && timeRemaining === "Event over") &&
                <motion.div style={{ textAlign: 'center', marginTop: '2em' }} whileHover={{ scale: 1.1 }}>
                    <Button
                        variant='contained'
                        size='small'
                        sx={{
                            color: 'white', borderColor: 'blue', '&:hover': { borderColor: 'gray' }
                        }} onClick={() => navigate(`/${sport}/${gameId}/completion`)}>Mark as completed</Button>
                </motion.div>

            }
            <div className={classes.detailsContainer}>
                <div className={classes.description}>
                    <h1>{sportDetails.Location}</h1>
                    <p>{fieldDetails?.street}</p>
                    {timeRemaining !== "Event over" && <p>{timeRemaining}</p>}
                    <div className={classes.registrationStatus}>
                        {time > 0 && sportDetails.PlayersCount > sportDetails.Players.length ?
                            <h3 style={{ color: 'green' }}>Registration open</h3> :
                            timeRemaining === "Event over" ?
                                <h3 style={{ color: 'red' }}>Event over</h3>
                                :
                                <h3 style={{ color: 'red' }}>Registration closed</h3>}
                        {timeRemaining !== "Event over" && <>
                            <p>{sportDetails.PlayersCount - sportDetails.Players.length} spots remaining</p>
                            {sportDetails.Owner === user?.displayName ?
                                <motion.div whileHover={{ scale: 1.1 }} className={classes.detailsBtn}>
                                    <Button
                                        variant='contained'
                                        size='small'
                                        sx={{
                                            color: 'white', borderColor: 'blue', '&:hover': { borderColor: 'gray' }
                                        }}
                                        onClick={openDialog}
                                    >Cancel event</Button>
                                </motion.div>

                                :

                                <motion.div whileHover={{ scale: 1.1 }} className={classes.detailsBtn}>
                                    <Button
                                        variant='contained'
                                        size='small'
                                        sx={{
                                            color: 'white', borderColor: 'blue', '&:hover': { borderColor: 'gray' },
                                            '&:disabled': { color: 'red', border: 'none' }
                                        }}
                                        disabled={sportDetails.PlayersCount === sportDetails.Players.length &&
                                            !sportDetails.Players.some(email => email === user?.displayName)}
                                        onClick={(e) => handleEventClick(e)}
                                    >{sportDetails.Players.some(email => email === user?.displayName) ? "Leave event" :
                                        sportDetails.PlayersCount === sportDetails.Players.length ? "Full" : "Join event"}
                                    </Button>
                                </motion.div>
                            }
                        </>}
                    </div >
                </div>
                <div className={classes.images}>
                    <GameImageContainer coverImages={fieldDetails?.additionalImages!} />
                </div>
                <div className={classes.players}>
                    {users.slice(0, 3).map((user) =>
                        <GamePlayers
                            key={user.users.email}
                            image={user.image}
                            displayName={user.users.username}
                            email={user.users.email} />
                    )}
                    {users.length > 3 &&
                        <motion.div whileHover={{ scale: 1.1 }} style={{ alignSelf: 'center' }}>
                            <Button
                                variant='contained'
                                size='small'
                                sx={{
                                    color: 'white', borderColor: 'blue', '&:hover': { borderColor: 'gray' }
                                }}
                                onClick={() => setShowPlayers(true)}>
                                Show all Players
                            </Button>
                        </motion.div>
                    }
                    <Modal
                        open={showPlayers}
                        onClose={() => setShowPlayers(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className={classes.modalStyles}>
                            {users.map((user) =>
                                <GamePlayers
                                    key={user.users.email}
                                    image={user.image}
                                    displayName={user.users.username}
                                    email={user.users.email} />
                            )}
                        </Box>
                    </Modal>
                </div>
            </div>
            <h2 className={classes.additionalHeader}>Additional info</h2>
            <div className={classes.additionalSection}>
                <div className={classes.map}>
                    <p>Event location</p>
                    <Map coordinate={fieldDetails?.coordinates!} />
                </div>
                <div>
                    <h3>Comments</h3>
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
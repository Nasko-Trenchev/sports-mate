import { Button, Tooltip, CircularProgress } from "@mui/material";
import { UserAuth } from '../../contexts/UserContext';
import { hoursLeft } from "../../util/helperFunctions";
import { color, motion } from 'framer-motion'
import Modal from '@mui/material/Modal';
import { useSubmit, useParams, useNavigate, useRouteLoaderData, Await, useNavigation } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import { SnackbarAlert } from '../Alert/Alert';
import AlertDialog from '../Alert/AlertDialog';
import useDialog from '../../hooks/dialog';
import useNotification from '../../hooks/notification';
import { FieldsImage } from "../../util/constants";
import Map from "../GoggleMap/GoogleMap";
import GamePlayers from "./GamePlayers";
import { loaderReturnArgs } from "../../pages/GameDetailsPage";
import GameImageContainer from "./GameImageContainer";
import classes from './GameDetails.module.css'
import { useState, Suspense } from "react";
import Box from "@mui/material/Box";
import Comments from "../Comments/Comments";
import CommentTextarea from "../Comments/CommentTextArea";
import { constructedObject } from "../../pages/GameDetailsPage";

const GameDetails: React.FC = () => {

    const { sport, gameId } = useParams();
    const { user } = UserAuth();
    const navigate = useNavigate()
    const submit = useSubmit();
    const { sportDetails, users, comments } = useRouteLoaderData('game-details') as loaderReturnArgs;
    const { openNotification, closeNotification, actionOption } = useNotification();
    const { closeDialog, open, openDialog } = useDialog();
    const [showPlayers, setShowPlayers] = useState(false);
    const navigation = useNavigation();

    const isSubmiting = navigation.state === 'submitting' || navigation.state === 'loading';

    const { timeRemaining, time } = hoursLeft(sportDetails.Time.toDate())

    const fieldDetails = FieldsImage.find(field => field.location === sportDetails.Location)

    const remainingSpots = sportDetails.PlayersCount - sportDetails.Players.length;

    const handleEventClick = (e: React.MouseEvent<HTMLButtonElement>) => {

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

    const submitComment = (e: React.MouseEvent<HTMLButtonElement>, comment: string) => {
        submit({
            action: `${e.currentTarget.textContent}`,
            sport: `${sport}`,
            id: `${sportDetails.id}`,
            user: `${user?.displayName}`,
            comment: `${comment}`
        },
            { method: "post", encType: "application/json" })
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
                    <Tooltip title="Show on Map" placement="top" >
                        <p>{fieldDetails?.street}</p>
                    </Tooltip>
                    {timeRemaining !== "Event over" && <p>{timeRemaining}</p>}
                    <div className={classes.registrationStatus}>
                        {time > 0 && sportDetails.PlayersCount > sportDetails.Players.length ?
                            <h3 style={{ color: 'green' }}>Registration open</h3> :
                            time > 0 && sportDetails.PlayersCount === sportDetails.Players.length ?
                                <h3 style={{ color: 'orange' }}>Event full</h3> :
                                time === 0 && sportDetails.PlayersCount > sportDetails.Players.length ?
                                    <h3 style={{ color: 'red' }}>Event cancelled, not enouth players</h3> :
                                    <h3 style={{ color: 'red' }}>Event over</h3>}
                        {time > 0 && <>
                            <p>{remainingSpots} {remainingSpots > 1 ? "spots" : "spot"} remaining</p>
                            {sportDetails.Owner === user?.displayName ?
                                <motion.div whileHover={{ scale: 1.1 }} className={classes.detailsBtn}>
                                    <Button
                                        variant='contained'
                                        size='small'
                                        disabled={isSubmiting}
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
                                            '&:disabled': { color: 'white', border: 'none' }
                                        }}
                                        disabled={sportDetails.PlayersCount === sportDetails.Players.length &&
                                            !sportDetails.Players.some(email => email === user?.displayName) || isSubmiting}
                                        onClick={(e) => handleEventClick(e)}
                                    >{isSubmiting ? "Processing..." : sportDetails.Players.some(email => email === user?.displayName) ? "Leave event" :
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
                    <Suspense fallback={<CircularProgress disableShrink sx={{ alignSelf: 'center' }} />}>
                        <Await resolve={users}>
                            {(defferedUsers: constructedObject) => (
                                defferedUsers.slice(0, 3).map((user) =>
                                    <GamePlayers
                                        key={user.email}
                                        image={user.image!}
                                        displayName={user.username}
                                        bgColor="background.paper"
                                    />
                                )
                            )}
                        </Await>
                        <Await resolve={users}>
                            {(defferedUsers: constructedObject) => (
                                defferedUsers.length > 3 &&
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
                            )}
                        </Await>
                    </Suspense>
                    <Modal
                        open={showPlayers}
                        onClose={() => setShowPlayers(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className={classes.modalStyles}>
                            <Suspense fallback={<CircularProgress disableShrink sx={{ alignSelf: 'center' }} />}>
                                <Await resolve={users}>
                                    {(defferedUsers: constructedObject) => (
                                        defferedUsers.map((user) =>
                                            <GamePlayers
                                                key={user.email}
                                                image={user.image!}
                                                displayName={user.username}
                                                bgColor="background.paper"
                                            />
                                        )
                                    )}
                                </Await>
                            </Suspense>
                        </Box>
                    </Modal>
                </div>
            </div >

            <div className={classes.additionalSection}>
                <div className={classes.gameComments}>
                    <Suspense fallback={<CircularProgress disableShrink sx={{ alignSelf: 'center' }} />}>
                        <Await
                            resolve={comments}>
                            {(deferedComments) => (
                                deferedComments.length === 0 ? (
                                    <div className={classes.noCommentsAvailable}>
                                        <h4>There aren`t any comments about this event yet </h4>
                                        <h4>Be the first to comment</h4>
                                    </div>
                                ) :
                                    <>
                                        <h2>Comments {`(${deferedComments.length})`}</h2>
                                        <Comments commentsData={deferedComments} />
                                    </>

                            )}
                        </Await>
                    </Suspense>
                    <CommentTextarea submitComment={submitComment} />
                </div>
                {/* <div className={classes.map}>
                    <h2>Location</h2>
                    <Map coordinate={fieldDetails?.coordinates!} />
                </div> */}
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
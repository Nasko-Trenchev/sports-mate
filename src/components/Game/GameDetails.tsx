import { Button, CircularProgress, Modal } from "@mui/material";
import { UserAuth } from '../../contexts/UserContext';
import { hoursLeft } from "../../util/helperFunctions";
import { motion } from 'framer-motion'
import { useSubmit, useParams, useNavigate, useRouteLoaderData, Await } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import { SnackbarAlert } from '../Alert/Alert';
import useNotification from '../../hooks/notification';
import { FieldsImage } from "../../util/constants";
import GamePlayers from "./GamePlayers";
import { loaderReturnArgs } from "../../pages/GameDetailsPage";
import GameImageContainer from "./GameImageContainer";
import classes from './GameDetails.module.css'
import { useState, Suspense } from "react";
import Box from "@mui/material/Box";
import Comments from "../Comments/Comments";
import CommentTextarea from "../Comments/CommentTextArea";
import { constructedObject } from "../../pages/GameDetailsPage";
import GameDetailsDescription from "./GameDetailsDescription";

const GameDetails: React.FC = () => {

    const { sport, gameId } = useParams();
    const { user } = UserAuth();
    const navigate = useNavigate()
    const submit = useSubmit();
    const { sportDetails, users, comments } = useRouteLoaderData('game-details') as loaderReturnArgs;
    const { openNotification, closeNotification, actionOption } = useNotification();
    const [showPlayers, setShowPlayers] = useState(false);

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
            {(sportDetails.Owner === user?.displayName && timeRemaining === "Event over" && remainingSpots === 0) &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }} >
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Button
                            variant='contained'
                            size='small'
                            sx={{
                                color: 'white', borderColor: 'blue', '&:hover': { borderColor: 'gray' }
                            }} onClick={() => navigate(`/${sport}/${gameId}/completion`)}>Mark as completed
                        </Button>
                    </motion.div>
                </div>
            }
            {(sportDetails.Owner === user?.displayName && time === 0) &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }} >
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Button
                            variant='contained'
                            size='small'
                            sx={{
                                color: 'white', borderColor: 'blue', '&:hover': { borderColor: 'gray' }
                            }} onClick={handleEventClick}>Delete event
                        </Button>
                    </motion.div>
                </div>
            }
            <div className={classes.detailsContainer}>
                <GameDetailsDescription handleEventClick={handleEventClick} />
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
            </div>
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
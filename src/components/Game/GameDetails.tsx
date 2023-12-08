import { Button, Snackbar } from "@mui/material";
import { UserAuth } from '../../contexts/UserContext';
import { hoursLeft } from "../../util/helperFunctions";
import { motion } from 'framer-motion'
import { useSubmit, useParams, useNavigate, useRouteLoaderData } from "react-router-dom";
import { SnackbarAlert } from '../Alert/Alert';
import useNotification from '../../hooks/notification';
import { FieldsImage } from "../../util/constants";
import { loaderReturnArgs } from "../../pages/GameDetailsPage";
import GameImageContainer from "./GameImageContainer";
import GameDetailsDescription from "./GameDetailsDescription";
import GamePlayersContainer from "./GamePlayersContainer";
import GameCommentContainer from "./GameCommentContainer";

import classes from './GameDetails.module.css'


const GameDetails: React.FC = () => {

    const { sport, gameId } = useParams();
    const { user } = UserAuth();
    const navigate = useNavigate()
    const submit = useSubmit();
    const { sportDetails } = useRouteLoaderData('game-details') as loaderReturnArgs;
    const { openNotification, closeNotification, actionOption } = useNotification();

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
                <GameImageContainer coverImages={fieldDetails?.additionalImages!} />
                <GamePlayersContainer />
            </div >
            <div className={classes.additionalSection}>
                <GameCommentContainer />
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
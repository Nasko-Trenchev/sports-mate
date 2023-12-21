import { Button, Tooltip, Modal } from "@mui/material";
import { motion } from 'framer-motion'
import { loaderReturnArgs } from "../../pages/GameDetailsPage";
import { useRouteLoaderData, useNavigation } from "react-router-dom";
import { FieldsImage } from "../../util/constants";
import { hoursLeft } from "../../util/helperFunctions";
import { useState } from "react";
import useDialog from '../../hooks/useDialog';
import { UserAuth } from '../../contexts/AuthContext';
import AlertDialog from '../Alert/AlertDialog';
import Map from "../GoggleMap/GoogleMap";

import classes from './GameDetailsDescription.module.css';

const GameDetailsDescription: React.FC<{ handleEventClick: (e: React.MouseEvent<HTMLButtonElement>) => void }> = (props) => {

    const [showMap, setShowMap] = useState(false);

    const { sportDetails} = useRouteLoaderData('game-details') as loaderReturnArgs;
    const { user } = UserAuth();
    const navigation = useNavigation();
    const { closeDialog, open, openDialog } = useDialog();
    const { timeRemaining, time } = hoursLeft(sportDetails.Time.toDate())
    const isSubmiting = navigation.state === 'submitting' || navigation.state === 'loading';

    const fieldDetails = FieldsImage.find(field => field.location === sportDetails.Location)
    const remainingSpots = sportDetails.PlayersCount - sportDetails.Players.length;

    return (
        <div className={classes.description}>
            <h1>{sportDetails.Location}</h1>
            <Tooltip title="Show on Google Maps" placement="top">
                <motion.p
                    onClick={() => setShowMap(true)}
                    className={classes.streetDetails}
                    whileHover={{ scale: 1.2 }}
                >{fieldDetails?.street}
                </motion.p>
            </Tooltip>
            <Modal
                open={showMap}
                onClose={() => setShowMap(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={classes.mapModalStyles}>
                    <div className={classes.map}>
                        <Map coordinate={fieldDetails?.coordinates!} />
                    </div>
                </div>
            </Modal>
            {timeRemaining !== "Event over" && <p>{timeRemaining}</p>}
            <div className={classes.registrationStatus}>
                {time > 0 && sportDetails.PlayersCount > sportDetails.Players.length ?
                    <h3 style={{ color: 'green' }}>Registration open</h3> :
                    time > 0 && sportDetails.PlayersCount === sportDetails.Players.length ?
                        <h3 style={{ color: 'orange' }}>Event full</h3> :
                        time === 0 && sportDetails.PlayersCount > sportDetails.Players.length ?
                            <h3 style={{ color: 'red' }}>Event cancelled, not enouth players</h3> :
                            <h3 style={{ color: 'red' }}>Event over</h3>}
                {time > 0 &&
                    <>
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
                                    disabled={(sportDetails.PlayersCount === sportDetails.Players.length &&
                                        !sportDetails.Players.some(email => email === user?.displayName)) || isSubmiting}
                                    onClick={(e) => props.handleEventClick(e)}
                                >{isSubmiting ? "Processing..." : sportDetails.Players.some(email => email === user?.displayName) ? "Leave event" :
                                    sportDetails.PlayersCount === sportDetails.Players.length ? "Full" : "Join event"}
                                </Button>
                            </motion.div>
                        }
                    </>}
            </div >
            <AlertDialog
                title='Confirm event cancellation'
                confirmationText="This action can`t be reverted! You`ll need to create another event if you proceed"
                open={open}
                confirm={(e) => props.handleEventClick(e)}
                cancel={closeDialog}
            />
        </div>)
}

export default GameDetailsDescription;
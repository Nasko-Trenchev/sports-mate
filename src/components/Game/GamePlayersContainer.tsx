import { useRouteLoaderData, Await } from "react-router-dom";
import { Button, CircularProgress, Modal, Box } from "@mui/material";
import { loaderReturnArgs } from "../../pages/GameDetailsPage";
import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import GamePlayers from "./GamePlayers";
import classes from './GamePlayersContainer.module.css';
import { constructedObject } from "../../pages/GameDetailsPage";

const GamePlayersContainer = () => {

    const [showPlayers, setShowPlayers] = useState(false);
    const { users } = useRouteLoaderData('game-details') as loaderReturnArgs;

    return (
        <div className={classes.players}>
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
        </div>
    )
}

export default GamePlayersContainer;
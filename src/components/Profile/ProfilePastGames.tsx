import Game from '../Game/Game';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import { profileData } from '../../pages/ProfilePage';
import { GamesTypes } from '../../util/sportTypes';
import classes from './ProfilePastGames.module.css'

type profileGamesData = {
    user: profileData,
    pendingGames: GamesTypes,
}
const ProfilePastGames = () => {

    const { pendingGames } = useLoaderData() as profileGamesData;
    const navigate = useNavigate();

    return (
        <div>
            <h1>Select game to mark as completed</h1>
            <Stack sx={{ width: '75%', margin: 'auto', marginTop: '5em' }}>
                {pendingGames.map(game =>
                    <Stack sx={{ gap: '1.5em' }}>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={classes.detailsBtn}
                            onClick={() => navigate(`/${game.sport}/${game.id}/completion`)}
                        >
                            <Button variant='contained' size='small'>Complete Game</Button>
                        </motion.div>
                        <Game data={game} />
                    </Stack>)}
            </Stack>
        </div >
    )
}

export default ProfilePastGames;
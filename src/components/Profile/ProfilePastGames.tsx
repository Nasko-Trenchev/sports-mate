import { useRouteLoaderData } from 'react-router-dom';
import { Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import Game from '../Game/Game';
import { combinedProfileData } from '../../util/sportTypes';
import classes from './ProfilePastGames.module.css'

const ProfilePastGames = () => {

    const { profile } = useRouteLoaderData('profile-data') as combinedProfileData

    const games = profile.GamesPlayed.filter(game => game.HasRated === false);


    return (
        <div>
            <h1>Select game to mark as completed</h1>
            <Stack sx={{ width: '75%', margin: 'auto', marginTop: '5em' }}>
                {games.map(game =>
                    <Stack sx={{ gap: '1.5em' }}>
                        <motion.div whileHover={{ scale: 1.1 }} className={classes.detailsBtn}>
                            <Button variant='contained' size='small'>Complete Game</Button>
                        </motion.div>
                        <Game data={game} />
                    </Stack>)}
            </Stack>
        </div>
    )
}

export default ProfilePastGames;
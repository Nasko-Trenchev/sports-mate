import { Stack, Divider, IconButton } from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles';
import { motion } from 'framer-motion'
import SportsSoccerSharpIcon from '@mui/icons-material/SportsSoccerSharp';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import classes from './HomePage.module.css';

const HomePage = () => {
    return (
        <StyledEngineProvider>
            <motion.div className={classes.mainContainer}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h1>SportsMate</h1>
                <p>Share your sport passion with fellow athletes in Sofia</p>
                <p>Select your sport to continue</p>
                <Stack
                    direction={"row"}
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={3}
                    className={classes.sports}>
                    <IconButton size="large" edge='start' color="inherit"  >
                        <SportsSoccerSharpIcon />
                        <div>Football</div>
                    </IconButton>
                    <IconButton size="large" edge='start' color="inherit"  >
                        <SportsTennisIcon />
                        <div>Tennis</div>
                    </IconButton>
                    <IconButton size="large" edge='start' color="inherit"  >
                        <SportsBasketballIcon />
                        <div>Basketball</div>
                    </IconButton>
                    <IconButton size="large" edge='start' color="inherit"  >
                        <SportsVolleyballIcon />
                        <div>Volleyball</div>
                    </IconButton>
                </Stack>
            </motion.div>
        </StyledEngineProvider>
    )
}

export default HomePage;
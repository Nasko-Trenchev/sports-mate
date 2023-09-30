import { Stack, Divider, IconButton } from "@mui/material";
import { NavLink } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { motion } from 'framer-motion'
import SportsSoccerSharpIcon from '@mui/icons-material/SportsSoccerSharp';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import classes from './HomePage.module.css';
import SportItem from "../Layout/SportItem";
import img from '../../assets/sportPitches.webp';

const HomePage = () => {
    return (
        <StyledEngineProvider>
            {/* <div className={classes.image}>
                <img src={img} alt="img" />
            </div> */}
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
                    <SportItem sport="Football" path='football'>
                        <SportsSoccerSharpIcon />
                    </SportItem>
                    <SportItem sport="Tennis" path='tennis'>
                        <SportsTennisIcon />
                    </SportItem >
                    <SportItem sport="Basketball" path='basketball'>
                        <SportsBasketballIcon />
                    </SportItem>
                    <SportItem sport="Volleyball" path='volleyball'>
                        <SportsVolleyballIcon />
                    </SportItem>
                </Stack>
            </motion.div>
        </StyledEngineProvider>
    )
}

export default HomePage;
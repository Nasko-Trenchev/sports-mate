import { Stack, Divider } from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles';
import { motion } from 'framer-motion'
import SportsSoccerSharpIcon from '@mui/icons-material/SportsSoccerSharp';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import classes from './Index.module.css';
import SportItem from "../Layout/SportItem";

const Index = () => {

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

export default Index;
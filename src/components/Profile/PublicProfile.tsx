import { useRouteLoaderData } from "react-router-dom";
import { publicProfileData } from "../../pages/PublicProfilePage";
import { motion } from "framer-motion";
import { useState } from "react";
import ProfileRating from "./ProfileRating";
import { getUserRating } from "../../util/helperFunctions";
import EventPagination from "../Event/EventPagination";
import classes from './PublicProfile.module.css'
import CustomTabPanel from "./ProfileTabs";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { StyledEngineProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const PublicProfile = () => {

    const { user, footballGames, basketballGames, tennisGames, volleyballGames } = useRouteLoaderData('public-profile') as publicProfileData;
    const { profileId } = useParams();
    const [value, setValue] = useState(0);
    const [playerStats, showPlayerStats] = useState(false);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleStatsChange = () => {
        showPlayerStats(prev => !prev)
    }

    const noDataAvailable = (sport: string) => {
        return <div className={classes.noDataAvailableYet}>
            <h2>{profileId} hasn`t played any {sport} games yet</h2>
        </div>
    }

    return (
        <StyledEngineProvider>
            <div className={classes.profileHeader}>
                <div className={classes.profileImgContainer}>
                    <img src={user.image} alt="profilePicture" />
                </div>
                <h1>{user.username}</h1>
            </div>
            <div className={classes.profileContainer}>
                <motion.div
                    whileHover={{ scale: 1.1 }} className={classes.statsButton}>
                    <Button
                        onClick={handleStatsChange}
                        variant='contained'
                        size='small'
                    >Player`s statistics</Button>
                </motion.div>
                {playerStats && <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}>
                    <h4>Total events attended: {user.pastGameIds.length}</h4>
                    <ProfileRating userRating={getUserRating(user)} />
                </motion.div>}
            </div>
            <Box className={classes.pastGamesContainer} sx={{ width: '60%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                    <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                        <Tab label="Football" {...a11yProps(0)} />
                        <Tab label="Tennis" {...a11yProps(1)} />
                        <Tab label="Basketball" {...a11yProps(2)} />
                        <Tab label="Volleyball" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    {footballGames.length > 0 ?
                        <EventPagination data={footballGames} /> :
                        noDataAvailable("football")}
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    {tennisGames.length > 0 ?
                        <EventPagination data={tennisGames} /> :
                        noDataAvailable("tennis")
                    }
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    {basketballGames.length > 0 ?
                        <EventPagination data={basketballGames} /> :
                        noDataAvailable("basketball")
                    }
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    {volleyballGames.length > 0 ?
                        <EventPagination data={volleyballGames} /> :
                        noDataAvailable("volleyball")
                    }
                </CustomTabPanel>
            </Box>
        </StyledEngineProvider>
    )
}

export default PublicProfile;
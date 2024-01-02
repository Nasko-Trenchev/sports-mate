import { useRouteLoaderData } from "react-router-dom";
import { publicProfileData } from "../../pages/PublicProfilePage";
import { useState } from "react";
import { Rating } from '@mui/material';
import EventPagination from "../Event/EventPagination";
import classes from './PublicProfile.module.css'
import CustomTabPanel from "./ProfileTabs";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { StyledEngineProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const PublicProfile = () => {

    const { user, footballGames, basketballGames, tennisGames, volleyballGames } = useRouteLoaderData('public-profile') as publicProfileData;
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const { profileId } = useParams();

    const ratingValue = Math.round(user.rating / user.votes)

    const noDataAvailable = (sport: any) => {
        return <div className={classes.noDataAvailableYet}>
            <h2>{profileId} hasn`t played any {sport} games yet</h2>
        </div>
    }

    // const handleStarsChange = (e: React.SyntheticEvent<Element, Event>, value: number | null) => {
    //     console.log(value)
    // }

    return (
        <StyledEngineProvider>
            <div className={classes.profileHeader}>
                <div className={classes.profileImgContainer}>
                    <img src={user.image} alt="profilePicture" />
                </div>
                <h1>{user.username}</h1>
            </div>
            <div className={classes.profileContainer}>
                <div>
                    <p>Total events attended: {user.pastGameIds.length}</p>
                    <div className={classes.ratingSection}>
                        <h2>Overall rating:</h2>
                        <div className={classes.ratingFlexContainer}>
                            <Rating
                                size='small'
                                sx={{ alignItems: 'center' }}
                                precision={1}
                                readOnly
                                value={ratingValue}
                            />
                            <p>{user.votes} votes</p>
                        </div>
                    </div>
                </div>
            </div>
            <Box className={classes.pastGamesContainer} sx={{ width: '60%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
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
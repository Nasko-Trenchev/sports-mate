import { useRouteLoaderData } from "react-router-dom";
import { profileData } from "../../pages/ProfilePage";
import { Rating } from "@mui/material";
import { useState } from 'react';
import Game from "../Game/Game";

const PublicProfile = () => {
    const [starts, setStars] = useState(0);
    const user = useRouteLoaderData('public-profile') as profileData;

    const handleStarsChange = (e: React.SyntheticEvent<Element, Event>, value: number | null) => {
        console.log(value)
    }

    return (
        <>
            {user.GamesPlayed.length > 0 && user.GamesPlayed.map(game => <Game data={game} />)}
            <div>It works!</div>
            <Rating
                size='small'
                precision={0.5}
                value={starts}
                onChange={(event, value) => handleStarsChange(event, value)}
            />
        </>
    )
}

export default PublicProfile;
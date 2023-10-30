import { useRouteLoaderData } from "react-router-dom";
import { publicProfileData } from "../../pages/PublicProfilePage";
import { profileData } from "../../pages/ProfilePage";
import Game from "../Game/Game";

const PublicProfile = () => {
    const { image, user } = useRouteLoaderData('public-profile') as publicProfileData;
    console.log(user)
    console.log(image)
    return (
        <>
            {user.GamesPlayed.length > 0 && user.GamesPlayed.map(game => <Game data={game} />)}
            <div>It works!</div>
        </>
    )
}

export default PublicProfile;
import { useRouteLoaderData } from "react-router-dom";
import { publicProfileData } from "../../pages/PublicProfilePage";
import { profileData } from "../../pages/ProfilePage";

const PublicProfile = () => {
    const { image, user } = useRouteLoaderData('public-profile') as publicProfileData;
    console.log(user)
    console.log(image)
    return (
        <div>It works!</div>
    )
}

export default PublicProfile;
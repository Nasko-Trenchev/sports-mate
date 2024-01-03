import Profile from "../components/Profile/Profile"
import { LoaderFunctionArgs } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { ref, getDownloadURL, listAll } from 'firebase/storage'
import { storage } from "../config/firebase";
import picture from '../assets/noProfile.webp'
import checkAuthentication from "../util/routeGuard";


export type profileData = {
    username: string,
    email: string,
    pastGameIds: string[],
    pendingCompletionGames: string[],
    absent: string[],
    footballRating?: number,
    footballVotes?: number,
    tennisRating?: number,
    tennisVotes?: number,
    volleyballRating?: number,
    volleyballVotes?: number,
    basketballRating?: number,
    basketballVotes?: number,
    // rating: number,
    // votes: number,
    image?: string
}

const ProfilePage = () => {
    return (
        <Profile />
    )
}

export default ProfilePage;

export async function loader({ request, params }: LoaderFunctionArgs) {

    const redirecUnAuthenticatedtUser = await checkAuthentication(request);

    if (redirecUnAuthenticatedtUser) {
        return redirecUnAuthenticatedtUser
    }

    try {
        const listRef = ref(storage, `ProfileImages/`)
        const images = await listAll(listRef);
        const image = images.items.find(img => img.name === auth.currentUser?.displayName!)
        let finalImage;
        if (image) {
            finalImage = await getDownloadURL(image)
        }
        else {
            finalImage = picture
        }

        const userData = await getDoc(doc(db, `users`, `${auth.currentUser?.displayName!}`))
        const finalData = userData.data() as profileData;

        return { image: finalImage, profile: finalData };
    } catch (error) {
        console.log(error)
    }


}

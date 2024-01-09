import PublicProfile from "../components/Profile/PublicProfile";
import { LoaderFunctionArgs, json } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { ref, getDownloadURL, listAll } from 'firebase/storage'
import { profileData } from "./ProfilePage";
import { GamesTypes, GameType } from "../util/sportTypes";
import picture from '../assets/noProfile.webp'


export type publicProfileData = {
    user: profileData,
    footballGames: GamesTypes,
    tennisGames: GamesTypes,
    basketballGames: GamesTypes,
    volleyballGames: GamesTypes
}
const PublicProfilePage = () => {
    return (
        <PublicProfile />
    )
}

export default PublicProfilePage;

export async function loader({ params }: LoaderFunctionArgs) {

    const userId = params.profileId;
    const footballGames = [] as GamesTypes;
    const tennisGames = [] as GamesTypes;
    const basketballGames = [] as GamesTypes;
    const volleyballGames = [] as GamesTypes;
    
    let finalImage;
    try {
        const userRef = doc(db, 'users', userId!);
        const userData = await getDoc(userRef);
        const user = userData.data() as profileData
        const listRef = ref(storage, `ProfileImages/`)

        const images = await listAll(listRef);
        const image = images.items.find(img => img.name === user.username)

        if (image) {
            finalImage = await getDownloadURL(image)
        }
        else {
            finalImage = picture
        }

        user.image = finalImage;
        for (const gameId of user.pastGameIds) {
            const id = gameId.split(":")[0];
            const sport = gameId.split(":")[1];
            const completedGameRef = await getDoc(doc(db, sport, id))
            const completedGame = completedGameRef.data() as GameType
            completedGame.id = id;
            switch (completedGame.sport) {
                case "football": footballGames.push(completedGame)
                    break;
                case "tennis": tennisGames.push(completedGame)
                    break;
                case "basketball": basketballGames.push(completedGame)
                    break;
                case "volleyball": volleyballGames.push(completedGame)
                    break;
                default:
                    break;
            }
        }

        return { user, footballGames, basketballGames, volleyballGames, tennisGames }

    } catch (error) {
        if (error instanceof Error) {
            throw json(
                {
                    name: "Something went wrong",
                    // message: "Refresh the page and try again later"
                    message: error.message
                },
                { status: 401 }
            );
        }
    }

}
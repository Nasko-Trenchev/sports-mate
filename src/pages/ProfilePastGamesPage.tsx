import ProfilePastGames from "../components/Profile/ProfilePastGames";
import { db, auth } from "../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import { LoaderFunctionArgs } from "react-router-dom";
import { profileData } from "./ProfilePage";
import { GameType, GamesTypes } from "../util/sportTypes";

const ProfilePastGamesPage = () => {

    return (
        <ProfilePastGames />
    )
}

export async function loader({ request, params }: LoaderFunctionArgs) {

    const user = await getDoc(doc(db, `users`, `${auth.currentUser?.displayName!}`))
    const userData = user.data() as profileData;
    const pendingGames = [] as GamesTypes;

    for (const gameId of userData.pendingCompletionGames) {
        const id = gameId.split(":")[0];
        const sport = gameId.split(":")[1];
        const pendingGameRef = await getDoc(doc(db, sport, id))
        const pendingGame = pendingGameRef.data() as GameType
        pendingGame.id = id;
        pendingGames.push(pendingGame)
    }

    return { user, pendingGames }
}


export default ProfilePastGamesPage;

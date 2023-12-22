import ProfileGameCompletion from "../components/Profile/ProfileGameCompletion";
import { LoaderFunctionArgs } from "react-router-dom";
import { getDoc, doc, updateDoc, arrayUnion, arrayRemove, deleteDoc, Timestamp, deleteField, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
const ProfileGameCompletionPage = () => {
    return (
        <ProfileGameCompletion />
    )
}

export async function loader({ request, params }: LoaderFunctionArgs) {

    const { sport, gameId } = params;
    const gameDocRef = doc(db, `${params.sport}`, `${params.gameId}`)

    
    return null;
}

export default ProfileGameCompletionPage;
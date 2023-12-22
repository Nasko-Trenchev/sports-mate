import CompleteEvent from "../components/Event/CompleteEvent"
import { db, auth } from "../config/firebase";
import { arrayUnion, doc, increment, setDoc, Timestamp, updateDoc, getDoc, arrayRemove } from "firebase/firestore";
import { profileData } from "./ProfilePage";
import { LoaderFunctionArgs, ActionFunctionArgs, json, defer } from "react-router-dom";
import checkAuthentication from "../util/routeGuard";
import { ref, getDownloadURL, listAll, list } from 'firebase/storage'
import { constructedObject } from "./GameDetailsPage";
import { GameType } from "../util/sportTypes";
import { storage } from "../config/firebase";
import picture from '../assets/noProfile.webp'

const CompleteEventPage = () => {

    return (
        <CompleteEvent />
    )
}

export default CompleteEventPage;

export async function loader({ request, params }: LoaderFunctionArgs) {

    const redirecUnAuthenticatedtUser = await checkAuthentication(request);

    if (redirecUnAuthenticatedtUser) {
        return redirecUnAuthenticatedtUser
    }

    try {
        const gameDocRef = doc(db, `${params.sport}`, `${params.gameId}`)
        const gameDocSnap = await getDoc(gameDocRef)
        const sportWithId = ({ ...gameDocSnap.data(), id: gameDocSnap.id }) as GameType;

        const listRef = ref(storage, `ProfileImages/`)
        const images = await list(listRef, { maxResults: 100 });

        const defferedProfileData = async () => {
            let neededData = [] as constructedObject;

            for (const player of sportWithId.Players) {
                const userRef = doc(db, 'users', player);
                const userData = await getDoc(userRef);
                const userObject = userData.data() as profileData
                let finalImage;
                const image = images.items.find(img => img.name === player)

                if (image) {
                    finalImage = await getDownloadURL(image)
                }
                else {
                    finalImage = picture
                }
                userObject.image = finalImage;
                neededData.push(userObject)
            }
            return neededData;
        }

        return defer({ sportDetails: sportWithId, users: defferedProfileData() });

    } catch (error) {
        if (error instanceof Error) {
            throw json(
                {
                    name: "Something went wrong",
                    message: "Refresh the page and try again later"
                },
                { status: 401 }
            );
        }
    }

}

export async function action({ params, request }: ActionFunctionArgs) {

    const data = await request.json()

    const { rating, sport, id, presence, comment, game } = data;

    const gameDocRef = doc(db, `${sport}`, `${id}`);
    const eventCommentDocRef = doc(db, `${sport}`, `${id}`, "Comments", `${id}`);

    const ratingArray = JSON.parse(rating);
    const presenceArray = JSON.parse(presence);

    if (comment !== "") {
        await updateDoc(eventCommentDocRef, {
            comments: arrayUnion({
                user: auth.currentUser?.displayName,
                comment,
                date: Timestamp.now()
            })
        });
    }

    if (rating.length > 0) {
        for (const data of ratingArray) {
            const userRef = doc(db, 'users', `${data.username}`);
            await updateDoc(userRef, {
                rating: increment(data.rating),
                votes: increment(1)
            })
        }
    }

    if (presenceArray.length > 0) {
        for (const username of presenceArray) {
            const userRef = doc(db, 'users', `${username}`);
            await setDoc(userRef, {
                absent: arrayUnion(id)
            }, { merge: true })
        }
    }

    const gameData = JSON.parse(game) as GameType
    const GameWithId = `${id}:${sport}`

    if (auth.currentUser?.displayName !== gameData.Owner) {
        const userRef = doc(db, 'users', auth.currentUser?.displayName!);
        await updateDoc(userRef, {
            pendingCompletionGames: arrayRemove(GameWithId)
        })
        return null
    }

    for (const player of gameData.Players) {
        const userRef = doc(db, 'users', player);
        if (player !== gameData.Owner) {
            await updateDoc(userRef, {
                pastGameIds: arrayUnion(GameWithId),
                pendingCompletionGames: arrayUnion(GameWithId)
            })
        }
        else {
            await updateDoc(userRef, {
                pastGameIds: arrayUnion(gameData.id),
            })
        }
    }

    await updateDoc(gameDocRef, {
        Completed: true
    })


    return null;
}

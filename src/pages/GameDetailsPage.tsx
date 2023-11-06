import GameDetails from "../components/Game/GameDetails";
import { LoaderFunctionArgs, ActionFunctionArgs, redirect, json } from "react-router-dom";
import { getDoc, doc, updateDoc, arrayUnion, arrayRemove, deleteDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { Sport } from "../util/sportTypes";
import { ref, getDownloadURL, listAll } from 'firebase/storage'
import { storage } from "../config/firebase";
import picture from '../assets/noProfile.webp'
import { profileData } from "./ProfilePage";
import checkAuthentication from "../util/routeGuard";


export type constructedObject = {
    users: profileData
    image: string

}[];

export type loaderReturnArgs = {
    sportDetails: Sport,
    users: constructedObject
}

const GameDetailsPage = () => {

    return (
        <GameDetails />
    )
}

export async function loader({ request, params }: LoaderFunctionArgs) {

    const redirecUnAuthenticatedtUser = checkAuthentication(request);

    if (redirecUnAuthenticatedtUser) {
        return redirecUnAuthenticatedtUser
    }

    try {
        const gameDocRef = doc(db, `${params.sport}`, `${params.gameId}`)
        const gameDocSnap = await getDoc(gameDocRef)
        const sportWithId = ({ ...gameDocSnap.data(), id: gameDocSnap.id }) as Sport;

        const listRef = ref(storage, `ProfileImages/`)
        const images = await listAll(listRef);

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
            neededData.push({
                users: userObject,
                image: finalImage
            })
        }

        return { sportDetails: sportWithId, users: neededData };
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

    try {
        const data = await request.json()

        const { action, sport, id, user } = data;

        const docRef = doc(db, `${sport}`, `${id}`);

        if (action === "Join event") {
            await updateDoc(docRef, {
                Players: arrayUnion(user)
            })
        }
        else if (action === "Leave event") {
            await updateDoc(docRef, {
                Players: arrayRemove(user)
            })
        }
        else {
            await deleteDoc(docRef);
            return redirect(`/${sport}`)
        }

        return redirect(`/${sport}/${id}`)
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
        else {
            throw json(
                {
                    message: "test",
                    name: "test"
                },
                { status: 401 }
            );
        }
    }
}
export default GameDetailsPage;
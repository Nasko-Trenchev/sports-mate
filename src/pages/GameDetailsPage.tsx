import GameDetails from "../components/Game/GameDetails";
import { LoaderFunctionArgs, ActionFunctionArgs, redirect, json } from "react-router-dom";
import { getDoc, doc, updateDoc, arrayUnion, arrayRemove, deleteDoc, collection, getDocs, Timestamp, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Sport, CommentsData } from "../util/sportTypes";
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
    comments: CommentsData,
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

        const commentsRef = collection(db, `${params.sport}`, `${params.gameId}`, "Comments");
        const commentsDocSnap = await getDocs(commentsRef);
        const comments = commentsDocSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as CommentsData;

        for (const comment of comments) {
            let profileImage;
            const image = images.items.find(img => img.name === comment.user)
            if (image) {
                profileImage = await getDownloadURL(image)
            }
            else {
                profileImage = picture
            }
            comment.image = profileImage;
        }
        console.log(comments)
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

        return { sportDetails: sportWithId, users: neededData, comments: comments };

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
        else if (action === 'Submit comment') {
            const eventCommentsRef = collection(db, `${sport}`, `${id}`, "Comments");
            const { comment } = data;
            await addDoc(eventCommentsRef, {
                user,
                comment,
                date: Timestamp.now()
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
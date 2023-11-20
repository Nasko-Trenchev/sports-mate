import GameDetails from "../components/Game/GameDetails";
import { LoaderFunctionArgs, ActionFunctionArgs, redirect, json } from "react-router-dom";
import { getDoc, doc, updateDoc, arrayUnion, arrayRemove, deleteDoc, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { Sport, CommentsData } from "../util/sportTypes";
import { ref, getDownloadURL, listAll, list } from 'firebase/storage'
import { storage } from "../config/firebase";
import picture from '../assets/noProfile.webp'
import { profileData } from "./ProfilePage";
import checkAuthentication from "../util/routeGuard";
import { auth } from "../config/firebase";


export type constructedObject = {
    users: profileData
    image: string

}[];

export type loaderReturnArgs = {
    sportDetails: Sport,
    users: constructedObject
    comments: CommentsData,
}

export type commentRefData = {
    comments: CommentsData
}

const GameDetailsPage = () => {

    return (
        <GameDetails />
    )
}

export async function loader({ request, params }: LoaderFunctionArgs) {


    const redirecUnAuthenticatedtUser = await checkAuthentication(request);

    if (redirecUnAuthenticatedtUser) {
        return redirecUnAuthenticatedtUser
    }

    try {
        const gameDocRef = doc(db, `${params.sport}`, `${params.gameId}`)
        const gameDocSnap = await getDoc(gameDocRef)
        const sportWithId = ({ ...gameDocSnap.data(), id: gameDocSnap.id }) as Sport;

        const listRef = ref(storage, `ProfileImages/`)
        const images = await list(listRef, { maxResults: 100 });

        const commentsRef = doc(db, `${params.sport}`, `${params.gameId}`, "Comments", `${params.gameId}`)
        const commentDocSnap = await getDoc(commentsRef);
        const commentsDoc = commentDocSnap.data() as commentRefData;
        const { comments } = commentsDoc;
        // const commentWithId = ({ ...commentDocSnap.data(), id: commentDocSnap.id }) as CommentsData;
        // const commentsRef = collection(db, `${params.sport}`, `${params.gameId}`, "Comments");
        // const commentsDocSnap = await getDocs(commentsRef);
        // const comments = commentsDocSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as CommentsData;

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
        // Can`t use PhotoUrl in UserProfile because pictures should be System.Uri -compact representation of a resource available
        // to your application on the intranet or internet. 

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
        // return { sportDetails: sportWithId, users: neededData };


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
            const eventCommentDocRef = doc(db, `${sport}`, `${id}`, "Comments", `${id}`);
            const { comment } = data;

            await updateDoc(eventCommentDocRef, {
                comments: arrayUnion({
                    user,
                    comment,
                    date: Timestamp.now()
                })
            });
            // const eventCommentsRef = collection(db, `${sport}`, `${id}`, "Comments");
            // const { comment } = data;
            // await addDoc(eventCommentsRef, {
            //     user,
            //     comment,
            //     date: Timestamp.now()
            // })
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
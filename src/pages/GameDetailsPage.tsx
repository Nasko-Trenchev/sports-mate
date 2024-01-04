import GameDetails from "../components/Game/GameDetails";
import { LoaderFunctionArgs, ActionFunctionArgs, redirect, json, defer } from "react-router-dom";
import { getDoc, doc, updateDoc, arrayUnion, arrayRemove, deleteDoc, Timestamp, deleteField, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { GameType, CommentsData } from "../util/sportTypes";
import { ref, getDownloadURL, listAll, list } from 'firebase/storage'
import { storage } from "../config/firebase";
import picture from '../assets/noProfile.webp'
import { profileData } from "./ProfilePage";
import { isPlayerSkillLevelEnought } from "../util/helperFunctions";
import checkAuthentication from "../util/routeGuard";

export type constructedObject = {
    username: string;
    email: string;
    pastGameIds: string[];
    pendingCompletionGames: string[];
    absent: string[];
    footballRating?: number;
    footballVotes?: number;
    tennisRating?: number;
    tennisVotes?: number;
    volleyballRating?: number;
    volleyballVotes?: number;
    basketballRating?: number;
    basketballVotes?: number;
    image?: string | undefined
}[];

export type loaderReturnArgs = {
    sportDetails: GameType,
    users: constructedObject
    comments: CommentsData,
    dbUser: profileData;
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

        const user = await getDoc(doc(db, `users`, `${auth.currentUser?.displayName!}`))
        const userData = user.data() as profileData;

        const gameDocRef = doc(db, `${params.sport}`, `${params.gameId}`)
        const gameDocSnap = await getDoc(gameDocRef)
        const sportWithId = ({ ...gameDocSnap.data(), id: gameDocSnap.id }) as GameType;

        const listRef = ref(storage, `ProfileImages/`)
        const images = await list(listRef, { maxResults: 100 });

        const commentsRef = doc(db, `${params.sport}`, `${params.gameId}`, "Comments", `${params.gameId}`)
        const commentDocSnap = await getDoc(commentsRef);
        const commentsDoc = commentDocSnap.data() as commentRefData;
        const { comments } = commentsDoc;

        const combinedComments = async () => {
            const latestComments = comments.sort((a, b) => Number(b.date) - Number(a.date));

            for (const comment of latestComments) {
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
            return latestComments;
        }

        // Can`t use PhotoUrl in UserProfile because pictures should be System.Uri -compact representation of a resource available
        // to your application on the intranet or internet. 

        const combinedProfile = async () => {
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

        return defer({ sportDetails: sportWithId, dbUser: userData, users: combinedProfile(), comments: combinedComments() });

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

export async function action({ params, request }: ActionFunctionArgs) {

    try {
        const data = await request.json()

        const { action, sport, id, displayName, user, skill } = data;

        const docRef = doc(db, `${sport}`, `${id}`);

        if (action === "Join event") {
            const playerEligible = isPlayerSkillLevelEnought(user, skill, sport)
            if (playerEligible) {
                await updateDoc(docRef, {
                    Players: arrayUnion(displayName)
                })
            }
        }
        else if (action === "Leave event") {
            await updateDoc(docRef, {
                Players: arrayRemove(displayName)
            })
        }
        else if (action === 'Submit comment') {
            const eventCommentDocRef = doc(db, `${sport}`, `${id}`, "Comments", `${id}`);
            const { comment } = data;

            await updateDoc(eventCommentDocRef, {
                comments: arrayUnion({
                    user: displayName,
                    comment,
                    date: Timestamp.now()
                })
            });
        }
        else {
            const commentsRef = doc(db, `${sport}`, `${id}`, `Comments`, `${id}`);
            let collectionSnapshot = await getDocs(collection(db, `${sport}`, `${id}`, `Comments`));
            await updateDoc(commentsRef, {
                comments: deleteField()
            });
            for (const doc of collectionSnapshot.docs) {
                await deleteDoc(doc.ref);
            }
            await deleteDoc(docRef);
            return redirect(`/${sport}/${id}/postDelete`)
        }

        return redirect(`/${sport}/${id}`)
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
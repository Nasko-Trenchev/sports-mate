import GameDetails from "../components/Game/GameDetails";
import { LoaderFunctionArgs, ActionFunctionArgs, redirect, defer } from "react-router-dom";
import { getDoc, doc, updateDoc, arrayUnion, arrayRemove, deleteDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Sport } from "../util/sportTypes";
import { ref, getDownloadURL, listAll } from 'firebase/storage'
import { storage } from "../config/firebase";
import picture from '../assets/noProfile.webp'
import { profileData } from "./ProfilePage";


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

    // sportWithId.Players.forEach(async (element) => {

    //     // const userRef = doc(db, 'users', element);
    //     // const userData = await getDoc(userRef);
    //     // const userObject = userData.data() as profileData
    //     // let finalImage;
    //     // const image = images.items.find(img => img.name === element)

    //     // if (image) {
    //     //     finalImage = await getDownloadURL(image)
    //     // }
    //     // else {
    //     //     finalImage = picture
    //     // }
    //     // neededData.push({
    //     //     users: userObject,
    //     //     image: finalImage
    //     // })

    // });
    // const usersRef = collection(db, 'users');
    // const userData = await getDocs(usersRef);
    // const users = userData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    // const image = images.items.find(img => img.name === auth.currentUser?.email!)
    // let finalImage;
    // if (image) {
    //     finalImage = await getDownloadURL(image)
    // }
    // else {
    //     finalImage = picture
    // }

    if (neededData.length > 0) {
        return { sportDetails: sportWithId, users: neededData };

    }
    else {
        return { sportDetails: sportWithId, users: [] };
    }



    // const currentSportRef = collection(db, `${params.sport}`);
    // try {
    //     const data = await getDocs(currentSportRef);
    //     const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Sports;
    //     return filteredData.sort((a, b) => Number(a.Time) - Number(b.Time));
    // } catch (error) {
    //     console.log(error)
    // }
}

export async function action({ params, request }: ActionFunctionArgs) {

    const data = await request.formData();
    const sport = data.get("sport")
    const action = data.get("action")
    const id = data.get('id')
    const userEmail = data.get('user')

    const docRef = doc(db, `${sport}`, `${id}`);

    if (action === "Join event") {
        await updateDoc(docRef, {
            Players: arrayUnion(userEmail)
        })
    }
    else if (action === "Leave event") {
        await updateDoc(docRef, {
            Players: arrayRemove(userEmail)
        })
    }
    else {
        await deleteDoc(docRef);
        return redirect(`/${sport}`)
    }

    return redirect(`/${sport}/${id}`)
}
export default GameDetailsPage;
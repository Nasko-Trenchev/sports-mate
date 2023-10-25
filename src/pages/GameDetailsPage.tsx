import GameDetails from "../components/Game/GameDetails";
import { LoaderFunctionArgs, ActionFunctionArgs, redirect } from "react-router-dom";
import { getDoc, doc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Sport } from "../util/sportTypes";



const GameDetailsPage = () => {

    return (
        <GameDetails />
    )
}

export async function loader({ request, params }: LoaderFunctionArgs) {

    const docRef = doc(db, `${params.sport}`, `${params.gameId}`)
    const docSnap = await getDoc(docRef)
    const docSnapWithId = ({ ...docSnap.data(), id: docSnap.id }) as Sport;
    return docSnapWithId;


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
    console.log(userEmail)
    console.log(action)
    console.log(id)
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
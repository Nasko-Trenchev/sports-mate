import Event from "../components/Event/Event";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { db } from "../config/firebase";
import { collection, getDocs, arrayUnion, doc, updateDoc, arrayRemove, deleteDoc } from "firebase/firestore";
import { ActionFunctionArgs } from "react-router-dom";
import { Sports } from "../util/sportTypes";


const EventPage = () => {
    return (
        <Event />
    )
}

export async function loader({ request, params }: LoaderFunctionArgs) {

    const currentSportRef = collection(db, `${params.sport}`);
    try {
        const data = await getDocs(currentSportRef);
        const sportsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Sports;
        ///Can be made with filter from the database
        return sportsData.sort((a, b) => Number(a.Time) - Number(b.Time)).filter(event => event.Completed === false)
    } catch (error) {
        console.log(error)
    }
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
    }

    return redirect('/football')
}

export default EventPage;
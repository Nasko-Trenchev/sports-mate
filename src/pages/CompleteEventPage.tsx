import test from "node:test";
import CompleteEvent from "../components/Event/CompleteEvent"
import { db } from "../config/firebase";
import { collection, getDocs, arrayUnion, doc, updateDoc, arrayRemove, deleteDoc } from "firebase/firestore";
import { ActionFunctionArgs, redirect } from "react-router-dom";

const CompleteEventPage = () => {

    return (
        <CompleteEvent />
    )
}

export default CompleteEventPage;

export async function action({ params, request }: ActionFunctionArgs) {

    const data = await request.json()

    const { rating, sport, id, presence, comment } = data;
    console.log(JSON.parse(rating))

    console.log(sport)
    console.log(id)
    console.log(presence)
    console.log(comment)

    const docRef = doc(db, `${sport}`, `${id}`);
    // const sport = data.get("sport")
    // const action = data.get("action")
    // const id = data.get('id')
    // const userEmail = data.get('user')

    // const docRef = doc(db, `${sport}`, `${id}`);

    // if (action === "Join event") {
    //     await updateDoc(docRef, {
    //         Players: arrayUnion(userEmail)
    //     })
    // }
    // else if (action === "Leave event") {
    //     await updateDoc(docRef, {
    //         Players: arrayRemove(userEmail)
    //     })
    // }
    // else {
    //     await deleteDoc(docRef);
    // }

    return redirect('/football')
}

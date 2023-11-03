import CompleteEvent from "../components/Event/CompleteEvent"
import { db } from "../config/firebase";
import { arrayUnion, doc, increment, setDoc } from "firebase/firestore";
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

    const eventCommentsRef = doc(db, `${sport}`, `${id}`, "Comments", `${id}`);

    const ratingArray = JSON.parse(rating);
    const presenceArray = JSON.parse(presence);

    if (comment !== "") {
        await setDoc(eventCommentsRef, {
            comments: arrayUnion({
                comment
            })
        }, { merge: true })
    }

    if (rating.length > 0) {
        for (const data of ratingArray) {
            const userRef = doc(db, 'users', `${data.username}`);
            await setDoc(userRef, {
                rating: increment(data.rating),
                votes: increment(1)
            }, { merge: true })
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

    return null;
}

import CompleteEvent from "../components/Event/CompleteEvent"
import { db } from "../config/firebase";
import { arrayUnion, doc, increment, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { ActionFunctionArgs } from "react-router-dom";

const CompleteEventPage = () => {

    return (
        <CompleteEvent />
    )
}

export default CompleteEventPage;

export async function action({ params, request }: ActionFunctionArgs) {

    const data = await request.json()

    const { rating, sport, id, presence, comment, event } = data;

    const gameDocRef = doc(db, `${sport}`, `${id}`);
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

    const game = JSON.parse(event)
    game.sport = params.sport;
    game.Time = new Timestamp(game.Time.seconds, game.Time.nanoseconds)
    game.Completed = true;

    for (const player of game.Players) {
        const userRef = doc(db, 'users', player);
        await updateDoc(userRef, {
            GamesPlayed: arrayUnion(game)
        })
    }
    await updateDoc(gameDocRef, {
        Completed: true
    })


    return null;
}

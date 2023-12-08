import Event from "../components/Event/Event";
import { LoaderFunctionArgs } from "react-router-dom";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Sports } from "../util/sportTypes";


const EventPage = () => {
    return (
        <Event />
    )
}

export async function loader({ request, params }: LoaderFunctionArgs) {
    try {
        const currentSportRef = collection(db, `${params.sport}`);
        const data = await getDocs(currentSportRef);
        const sportsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Sports;

        ///Can be made with filter from the database
        return sportsData.filter(event => event.Completed === false).sort((a, b) => Number(a.Time) - Number(b.Time))
    } catch (error) {
        console.log(error)
    }
}

export default EventPage;
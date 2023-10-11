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
    
    const currentSportRef = collection(db, `${params.sport}`);
    try {
        const data = await getDocs(currentSportRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Sports;
        return filteredData;
    } catch (error) {
        console.log(error)
    }

}

export default EventPage;
import Event from "../components/Event/Event";
import { LoaderFunctionArgs } from "react-router-dom";
import { useParams, useRouteLoaderData, json, redirect, useLoaderData } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, collection, getDocs } from "firebase/firestore";
import { Sport } from "../util/sportTypes";


const EventPage = () => {

    console.log("EventPage")
    const data = useLoaderData();
    console.log(data)
    return (
        <Event />
    )
}


export async function loader({ request, params }: LoaderFunctionArgs) {
    const currentSport = collection(db, "Football");
    console.log("Yes")
    try {
        const data = await getDocs(currentSport);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Sport;
        return filteredData;
    } catch (error) {
        console.log(error)
    }

}

export default EventPage;
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
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Sports;
        return filteredData;
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


    // let regex = new RegExp(/[0-9]{3,}/gm)

    // let matches = regex.exec(jsonTime)![0]

    // let time = new Timestamp(Number(matches), 0)


    // const docRef = await addDoc(collection(db, `${params.sport}`), {
    //     Image: data.get('Image'),
    //     Location: data.get('Location'),
    //     Owner: data.get('Owner'),
    //     Players: arrayUnion(data.get('Players')),
    //     SkillLevel: data.get('SkillLevel'),
    //     Time: timeAsTimeStamp,
    //     PlayersCount: Number(data.get('PlayersCount')),
    // });

    return redirect('/football')
}

export default EventPage;
import CreateEvent from "../components/Event/CreateEvent";
import { collection, addDoc, arrayUnion } from 'firebase/firestore';
import { ActionFunctionArgs } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";

import { redirect } from "react-router-dom";

const CreatePage = () => {

    return (
        <CreateEvent />
    )
}

export default CreatePage;

export async function action({ params, request }: ActionFunctionArgs) {

    const data = await request.formData();

    const jsonTime = data.get('Time') as string;

    const timeAsTimeStamp = Timestamp.fromDate(new Date(jsonTime));

    const docRef = await addDoc(collection(db, `${params.sport}`), {
        Image: data.get('Image'),
        Location: data.get('Location'),
        Owner: data.get('Owner'),
        Players: arrayUnion(data.get('Players')),
        SkillLevel: data.get('SkillLevel'),
        Time: timeAsTimeStamp,
        PlayersCount: Number(data.get('PlayersCount')),
        Completed: false,
    });

    return redirect(`/${params.sport}`)
}
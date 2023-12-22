import { collection, getDocs } from "firebase/firestore"
import { Register } from "../components/Register/Register"
import { db } from "../config/firebase";
import { LoaderFunctionArgs } from "react-router-dom";

export type usersProfiles = {
    username: string,
    email: string,
    pastGameIds: string[],
    pendingCompletionGames: string[],
    absent: string[],
    rating: number,
    votes: number,
    id: string
}[]

const RegisterPage = () => {

    return (
        <Register />
    )
}


export async function loader({ request, params }: LoaderFunctionArgs) {

    const usersRef = collection(db, 'users')
    const usersData = await getDocs(usersRef);
    const sportsData = usersData.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as usersProfiles;

    return sportsData;

}
export default RegisterPage;
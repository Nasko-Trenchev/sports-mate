import Profile from "../components/Profile/Profile"
import { LoaderFunctionArgs } from "react-router-dom";
import { getDoc, doc, collection } from "firebase/firestore";
import { db, auth } from "../config/firebase";

export type profileData = {
    username: string
}
const ProfilePage = () => {

    return (
        <Profile />
    )
}

export default ProfilePage;

export async function loader({ request, params }: LoaderFunctionArgs) {

    try {
        const data = await getDoc(doc(db, `users`, `${auth.currentUser?.uid!}`));
        return data.data() as profileData;
    } catch (error) {
        console.log(error)
    }
}

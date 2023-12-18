import { LoaderFunctionArgs } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { profileData } from "./ProfilePage";
import Index from "../components/Index/Index";

const HomePage = () => {
    return (
        <Index />
    )
}
export async function loader({ request, params }: LoaderFunctionArgs) {

    if (auth.currentUser) {
        const user = await getDoc(doc(db, `users`, `${auth.currentUser?.displayName!}`))
        const userData = user.data() as profileData
        return userData;
    }
    return null
}

export default HomePage;
import Profile from "../components/Profile/Profile"
import { LoaderFunctionArgs } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { ref, getDownloadURL, listAll } from 'firebase/storage'
import { storage } from "../config/firebase";
import picture from '../assets/noProfile.webp'
import { Sports } from "../util/sportTypes";


export type profileData = {
    username: string,
    email: string,
    game: Sports
}

const ProfilePage = () => {
    return (
        <Profile />
    )
}

export default ProfilePage;

export async function loader({ request, params }: LoaderFunctionArgs) {

    const listRef = ref(storage, `ProfileImages/`)
    const images = await listAll(listRef);
    const image = images.items.find(img => img.name === auth.currentUser?.displayName!)
    let finalImage;
    if (image) {
        finalImage = await getDownloadURL(image)
    }
    else {
        finalImage = picture
    }

    const userData = await getDoc(doc(db, `users`, `${auth.currentUser?.displayName!}`))
    const finalData = userData.data() as profileData;

    return { image: finalImage, profile: finalData };
    // try {
    //     const userData = await getDoc(doc(db, `users`, `${auth.currentUser?.uid!}`));
    //     return userData.data() as profileData;
    // } catch (error) {
    //     console.log(error)
    // }
}

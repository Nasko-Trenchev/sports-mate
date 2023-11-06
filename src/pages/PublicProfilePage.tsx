import PublicProfile from "../components/Profile/PublicProfile";
import { LoaderFunctionArgs } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { ref, getDownloadURL, listAll } from 'firebase/storage'
import { profileData } from "./ProfilePage";
import picture from '../assets/noProfile.webp'


export type publicProfileData = {
    user: profileData;
    image: string;
}
const PublicProfilePage = () => {
    return (
        <PublicProfile />
    )
}

export default PublicProfilePage;

export async function loader({ request, params }: LoaderFunctionArgs) {

    const userId = params.profileId;
    let finalImage;
    try {
        const userRef = doc(db, 'users', userId!);
        const userData = await getDoc(userRef);
        const userObject = userData.data() as profileData
        const listRef = ref(storage, `ProfileImages/`)

        const images = await listAll(listRef);
        const image = images.items.find(img => img.name === userObject.username)

        if (image) {
            finalImage = await getDownloadURL(image)
        }
        else {
            finalImage = picture
        }

        return { image: finalImage, user: userObject };
    } catch (error) {

    }

}
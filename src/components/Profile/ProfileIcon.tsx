import { IconButton } from "@mui/material";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from "react";
import { profileData } from "../../pages/ProfilePage";
import { auth } from "../../config/firebase";
import { db } from "../../config/firebase";

const ProfileIcon = () => {

    const [notification, setNotification] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const q = query(collection(db, "users"), where("username", "==", `${auth.currentUser?.displayName}`));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added" || change.type === "modified") {
                    const userData = change.doc.data() as profileData;
                    const count = userData.pendingCompletionGames.length;
                    setNotification(count)
                }
            });
        }, (error) => {
            console.log(error)
        })

        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <IconButton size="large" edge='start' color="inherit" aria-label="logo" sx={{ margin: '1px' }}
            onClick={() => navigate('/profile')}>
            <Badge badgeContent={notification} color="primary">
                <AccountCircleIcon />
            </Badge>
        </IconButton >
    )
}

export default ProfileIcon;
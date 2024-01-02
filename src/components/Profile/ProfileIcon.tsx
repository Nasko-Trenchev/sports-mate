import { IconButton } from "@mui/material";
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from "react";
import React from "react";
import { getDoc, doc } from "firebase/firestore";
import { profileData } from "../../pages/ProfilePage";
import { auth } from "../../config/firebase";
import { db } from "../../config/firebase";


const ProfileIcon = () => {

    const [notification, setNotification] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const user = await getDoc(doc(db, `users`, `${auth.currentUser?.displayName!}`))
            const userData = user.data() as profileData;
            const count = userData.pendingCompletionGames.length;
            setNotification(count)
        }
        getUser()
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

export default React.memo(ProfileIcon);
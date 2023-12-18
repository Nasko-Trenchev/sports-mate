import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { UserAuth } from "../contexts/AuthContext";
export default function Logout() {

    const { signOutUser } = UserAuth();
    const navigate = useNavigate();

    const onLogout = useCallback(async () => {
        await signOutUser();
    }, [signOutUser])

    useEffect(() => {
        onLogout();
        navigate("/");
    }, [onLogout, navigate])

    return null;
}
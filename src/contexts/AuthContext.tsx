import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
    createUserWithEmailAndPassword, UserCredential,
    signInWithEmailAndPassword, updateProfile, signOut, signInWithPopup,
    onAuthStateChanged, User
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';


export interface AuthContextModel {
    user: User | null
    loginUser: (email: string, password: string) => Promise<UserCredential>
    createUser: (email: string, password: string, displayName: string) => Promise<void>
    signOutUser: () => Promise<void>
    singUpWithGoogle: () => Promise<UserCredential>
    isAuthenticated: boolean
}

type AuthContextProviderProps = {
    children: ReactNode
}

const AuthContext = createContext<AuthContextModel>({} as AuthContextModel);

export const AuthContextProvider = ({ children }: AuthContextProviderProps): JSX.Element => {

    const [user, setUser] = useState<User | null>(null);

    const createUser = async (email: string, password: string, displayName: string) => {

        await createUserWithEmailAndPassword(auth, email, password);

        return updateProfile(auth.currentUser!, {
            displayName: displayName
        })
    }

    const loginUser = async (email: string, password: string) => {

        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOutUser = () => {
        return signOut(auth)
    }

    const singUpWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const isAuthenticated = user !== null;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })

        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={{ createUser, loginUser, signOutUser, singUpWithGoogle, user, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}
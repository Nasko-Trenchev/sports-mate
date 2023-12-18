import { auth } from "../config/firebase"
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { redirect } from "react-router-dom";

export default async function checkAuthentication(request: Request) {

    const user = await new Promise((resolve) => {
        const user = onAuthStateChanged(auth, (currentUser) => {
            let params = new URLSearchParams();
            params.set("from", new URL(request.url).pathname);

            if (!currentUser) {
                resolve(redirect("/login?" + params.toString()))
            }
             
            resolve(null);
        })
    })

    return user;
}



import { auth } from "../config/firebase"
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { redirect } from "react-router-dom";

export default async function checkAuthentication(request: Request) {

    // const subsription = getAuth(app)
    const user = await new Promise((resolve, reject) => {
        const user = onAuthStateChanged(auth, (currentUser) => {
            let params = new URLSearchParams();
            params.set("from", new URL(request.url).pathname);

            if (!currentUser) {
                resolve(redirect("/login?" + params.toString()))
            }

            resolve(null);
        })
    })
    ///dasdas
    //Тука ми е идеята да викна от Store-a const state = store.getState();

    return user;
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser)
    //     })

    //     return () => {
    //         unsubscribe();
    //     }
    // }, [])
    // let params = new URLSearchParams();
    // params.set("from", new URL(request.url).pathname);

    // if (!user) {
    //     return redirect("/login?" + params.toString());
    // }

    // return null;
}



import { auth } from "../config/firebase"
import { redirect } from "react-router-dom";

export default function checkAuthentication(request: Request) {

    const user = auth.currentUser;

    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);

    if (!user) {
        return redirect("/login?" + params.toString());
    }

    return null;
}



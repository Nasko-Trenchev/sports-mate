import { LoaderFunctionArgs } from "react-router-dom";
import checkAuthentication from "./routeGuard";

export async function privateRouteloader({ request }: LoaderFunctionArgs) {


    const redirecUnAuthenticatedtUser = await checkAuthentication(request);

    if (redirecUnAuthenticatedtUser) {
        return redirecUnAuthenticatedtUser
    }

    return null;

}
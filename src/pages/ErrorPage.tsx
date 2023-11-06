import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import NavigationHeader from "../components/Layout/NavigationHeader";
import PageContent from "../components/PageContent";

const ErrorPage = () => {
    const error = useRouteError();

    let title = 'An error occured';
    let message = 'Something went wrong';

    if (isRouteErrorResponse(error)) {
        if (error.status === 500) {
            message = error.data.message;
        };
        if (error.status === 404) {
            message = "Could not found resource or page"
            title = "Not found"
        }
        if (error.status === 401) {
            title = error.data.name;
            message = error.data.message;

        }
    }

    return (
        <>
            <NavigationHeader />
            <PageContent title={title} >
                <p>{message}</p>
            </PageContent>
        </>

    )
}

export default ErrorPage;
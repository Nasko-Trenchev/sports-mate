import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../pages/Root';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: []
    }
])

export default router;
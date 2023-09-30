import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../pages/Root';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../components/HomePage/HomePage';
import FootBallPage from '../pages/FootballPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'football', element: <FootBallPage /> }
        ]
    }
])

export default router;
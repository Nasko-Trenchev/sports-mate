import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../pages/Root';
import { loader as sportsLoader } from '../pages/EventPage';
// import { action as creatAction } from '../components/Event/CreateEvent';
import { action as createAction } from '../pages/CreatePage';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../components/HomePage/HomePage';
import EventPage from '../pages/EventPage';
import LoginPage from '../pages/LoginPage';
import CreatePage from '../pages/CreatePage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import Logout from '../pages/LogoutPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'logout', element: <Logout /> },
            { path: 'profile', element: <ProfilePage /> },
            {
                path: ':sport',
                id: 'sport-details',
                loader: sportsLoader,
                children: [
                    {
                        index: true, element: <EventPage />
                    },
                    { path: 'create', element: <CreatePage />, action: createAction },
                ]
            }
        ]
    }
])

export default router;
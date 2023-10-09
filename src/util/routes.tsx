import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../pages/Root';
import { loader as sportsLoader } from '../pages/EventPage';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../components/HomePage/HomePage';
import EventPage from '../pages/EventPage';
import LoginPage from '../pages/LoginPage';
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
            { path: 'football', element: <EventPage />, loader: sportsLoader }
        ]
    }
])

export default router;
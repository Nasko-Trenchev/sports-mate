import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../pages/Root';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../components/HomePage/HomePage';
import FootBallPage from '../pages/FootballPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
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
            { path: 'football', element: <FootBallPage /> }
        ]
    }
])

export default router;
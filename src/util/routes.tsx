import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../pages/Root';
import { loader as sportsLoader } from '../pages/EventPage';
import { loader as profileLoader } from '../pages/ProfilePage';
import { action as createAction } from '../pages/CreatePage';
import { loader as gameDetailsLoader, action as gameDetailsAction } from '../pages/GameDetailsPage';
import CompleteEventPage from '../pages/CompleteEventPage';
import { action as completeAction } from '../pages/CompleteEventPage';
import PublicProfilePage from '../pages/PublicProfilePage';
import { loader as publicProfileLoader } from '../pages/PublicProfilePage';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../components/HomePage/HomePage';
import EventPage from '../pages/EventPage';
import LoginPage from '../pages/LoginPage';
import CreatePage from '../pages/CreatePage';
import GameDetailsPage from '../pages/GameDetailsPage';
import RegisterPage from '../pages/RegisterPage';
import ProfileSettingsPage from '../pages/ProfileSettingsPage';
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
            {
                path: 'profile', id: 'profile-data', loader: profileLoader,
                children: [
                    { index: true, element: <ProfilePage /> },
                    { path: 'settings', element: <ProfileSettingsPage /> }
                ]
            },
            {
                path: ':sport',
                id: 'sport-details',
                loader: sportsLoader,
                children: [
                    {
                        index: true, element: <EventPage />
                    },
                    { path: 'create', element: <CreatePage />, action: createAction },
                    {
                        path: ':gameId', id: 'game-details', loader: gameDetailsLoader,
                        children: [
                            {
                                index: true, element: <GameDetailsPage />, action: gameDetailsAction
                            },
                            { path: 'completion', element: <CompleteEventPage />, action: completeAction }
                        ]
                    },
                ]
            },
            {
                path: 'publicProfile',
                children: [
                    {
                        index: true
                    },
                    { path: ':profileId', id: 'public-profile', element: <PublicProfilePage />, loader: publicProfileLoader }
                ]
            }
        ]
    }
])

export default router;
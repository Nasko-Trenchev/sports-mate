import NavigationHeader from '../components/Layout/NavigationHeader';
import { Outlet, useNavigation } from 'react-router-dom';

export default function RootLayout() {

    // const navigation = useNavigation();


    return (
        <>
            <NavigationHeader />
            <main>
                {/* {navigation.state === "loading" && <p>Loading...</p>} */}
                <Outlet />
            </main>
        </>
    )
}
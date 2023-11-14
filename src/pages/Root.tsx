import NavigationHeader from '../components/Layout/NavigationHeader';
import Footer from '../components/Footer/Footer';
import { Outlet, useNavigation } from 'react-router-dom';

export default function RootLayout() {

    // const navigation = useNavigation();


    return (
        <>
            <NavigationHeader />
            <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                {/* {navigation.state === "loading" && <p>Loading...</p>} */}
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
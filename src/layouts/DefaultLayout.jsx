import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import CompareList from '../components/CompareList';


export default function DefaultLayout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <CompareList />
        </>
    );
}
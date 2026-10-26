import { Suspense } from 'react';
import { Outlet } from "react-router";
import SearchForm from "../SearchWidget/SearchForm"
import HomeIcon from "@/shared/ui/HomeIcon/HomeIcon";
import Loader from '@/shared/ui/Loader/Loader';

const Layout = () => {

    return (
        <>
            <header>
                <SearchForm />
                <HomeIcon />
            </header>
            <main>
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    )
}

export default Layout


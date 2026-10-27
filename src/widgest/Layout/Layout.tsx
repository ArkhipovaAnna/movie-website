import { Suspense } from 'react';
import { Outlet, useLocation } from "react-router";
import SearchForm from "../SearchWidget/SearchForm"
import HomeIcon from "@/shared/ui/HomeIcon/HomeIcon";
import Loader from '@/shared/ui/Loader/Loader';
import ErrorBoundary from '@/shared/ui/ErrorBoundary/ErrorBoundary';
import ErrorFallback from '@/shared/ui/ErrorFallback/ErrorFallback';

const Layout = () => {

    const location = useLocation();

    return (
        <>
            <header>
                <SearchForm />
                <HomeIcon />
            </header>
            <main>
                <ErrorBoundary
                    resetKey={location.key}
                    fallback={(reset) => <ErrorFallback onRetry={reset} />}
                >
                    <Suspense fallback={<Loader />}>
                        <Outlet />
                    </Suspense>
                </ErrorBoundary>
            </main>
        </>
    )
}

export default Layout


import { Suspense } from 'react';
import { Outlet, useLocation } from "react-router";
import SearchForm from "../SearchWidget/SearchForm"
import HomeIcon from "@/shared/ui/HomeIcon/HomeIcon";
import UserMenu from "../UserMenu/UserMenu";
import AuthDialog from "@/features/auth/AuthDialog/AuthDialog";
import Loader from '@/shared/ui/Loader/Loader';
import ErrorBoundary from '@/shared/ui/ErrorBoundary/ErrorBoundary';
import ErrorFallback from '@/shared/ui/ErrorFallback/ErrorFallback';
import styles from './Layout.module.scss';

const Layout = () => {

    const location = useLocation();

    return (
        <>
            <header className={styles.wrapper}>
                <HomeIcon />
                {/* <div className={styles.alignment}> */}
                <SearchForm />
                <UserMenu />
                {/* </div> */}
                <AuthDialog />
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


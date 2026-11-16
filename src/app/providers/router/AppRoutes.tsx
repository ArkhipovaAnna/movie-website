import React from 'react';
import { Routes, Route } from 'react-router';
import ScrollToTop from '@/shared/ui/ScrollToTop/ScrollToTop';
import Layout from '@/widgest/Layout/Layout';
import RequireAuth from '@/features/auth/RequireAuth/RequireAuth';

const HomePage = React.lazy(() => import('@/pages/HomePage/HomePage'));
const DetailsPage = React.lazy(() => import('@/pages/DetailsPage/DetailsPage'));
const ActorPage = React.lazy(() => import('@/pages/ActorPage/ActorPage'));
const NotFound = React.lazy(() => import('@/pages/NotFound/NotFound'));
const ProfilePage = React.lazy(() => import('@/pages/ProfilePage/ProfilePage'));

const AppRoutes = () => {

    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/details/:id' element={<DetailsPage />} />
                    <Route path='/staff/:id' element={<ActorPage />} />
                    <Route path='/profile' element={<RequireAuth><ProfilePage /></RequireAuth>} />
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes >
        </>
    )
}

export default AppRoutes

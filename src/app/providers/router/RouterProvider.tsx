import React, { Suspense } from 'react';;;
import { Routes, Route } from 'react-router';
import ScrollToTop from '@/shared/ui/ScrollToTop/ScrollToTop';
import Layout from '@/widgest/Layout/Layout';

const HomePage = React.lazy(() => import('@/pages/HomePage/HomePage'));
const DetailsPage = React.lazy(() => import('@/pages/DetailsPage/DetailsPage'));
const ActorPage = React.lazy(() => import('@/pages/ActorPage/ActorPage'));
const NotFound = React.lazy(() => import('@/pages/NotFound/NotFound'));

const RouterProvider = () => {

    return (
        <>
            <ScrollToTop />
            <Suspense fallback={<div>loading</div>}>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/details/:id' element={<DetailsPage />} />
                        <Route path='/staff/:id' element={<ActorPage />} />
                        <Route path='*' element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </>
    )
}

export default RouterProvider
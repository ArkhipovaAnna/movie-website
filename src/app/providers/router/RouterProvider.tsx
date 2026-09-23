import { Routes, Route } from 'react-router'
import ScrollToTop from '../../../shared/ui/ScrollToTop/ScrollToTop';
import Layout from '../../../widgest/Layout/Layout'
import HomePage from '../../../pages/HomePage/HomePage'
import DetailsPage from '../../../pages/DetailsPage/DetailsPage'
import ActorPage from '../../../pages/ActorPage/ActorPage'
import NotFound from '../../../pages/NotFound/NotFound'

const RouterProvider = () => {

    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/details/:id' element={<DetailsPage />} />
                    <Route path='/staff/:id' element={<ActorPage />} />
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </>
    )
}

export default RouterProvider
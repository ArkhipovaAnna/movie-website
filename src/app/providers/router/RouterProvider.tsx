import { Routes, Route } from 'react-router'
import Layout from '../../../widgest/Layout/Layout'
import HomePage from '../../../pages/HomePage/HomePage'
import DetailsPage from '../../../pages/DetailsPage/DetailsPage'
import NotFound from '../../../pages/NotFound/NotFound'

const RouterProvider = () => {

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/details' element={<DetailsPage />} />
            </Route>
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default RouterProvider
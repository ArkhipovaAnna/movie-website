import { Routes, Route } from 'react-router'
import { useState } from 'react'
import useSearch from '../../../features/search/useSearch'
import Layout from '../../../widgest/Layout/Layout'
import HomePage from '../../../pages/HomePage/HomePage'
import DetailsPage from '../../../pages/DetailsPage/DetailsPage'
import NotFound from '../../../pages/NotFound/NotFound'

const RouterProvider = () => {

    const [query, setQuery] = useState(() => {
        return sessionStorage.getItem('query') || '';
    });

    const data = useSearch(query);

    return (
        <Routes>
            <Route element={<Layout setQuery={setQuery} />}>
                <Route path='/' element={<HomePage data={data} />} />
                <Route path='/details' element={<DetailsPage />} />
            </Route>
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default RouterProvider
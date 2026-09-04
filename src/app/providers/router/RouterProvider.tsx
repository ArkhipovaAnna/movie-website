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

    const [page, setPage] = useState(() => {
        const saved = sessionStorage.getItem('page');
        return saved ? Number(saved) : 1;
    });

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        sessionStorage.setItem('page', String(value));
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    };

    const { movies, pages } = useSearch(query, page);

    return (
        <Routes>
            <Route element={<Layout setQuery={setQuery} setPage={setPage} />}>
                <Route path='/' element={<HomePage movies={movies} pages={pages} page={page} onChange={handleChange} />} />
                <Route path='/details' element={<DetailsPage />} />
            </Route>
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default RouterProvider
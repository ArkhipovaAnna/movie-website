import { Outlet } from "react-router";
// import useSearch from "../../features/search/useSearch"
import SearchForm from "../SearchWidget/SearchForm"

interface LayoutProps {
    setQuery: (value: string) => void;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Layout = ({ setQuery, setPage }: LayoutProps) => {

    return (
        <>
            <header>
                <SearchForm setQuery={setQuery} setPage={setPage} />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout


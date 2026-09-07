import { Outlet } from "react-router";
// import useSearch from "../../features/search/useSearch"
import SearchForm from "../SearchWidget/SearchForm"

interface LayoutProps {
    setQuery: (value: string) => void;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Layout = ({ setQuery, setCurrentPage }: LayoutProps) => {

    return (
        <>
            <header>
                <SearchForm setQuery={setQuery} setCurrentPage={setCurrentPage} />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout


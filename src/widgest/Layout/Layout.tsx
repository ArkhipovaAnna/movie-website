import { Outlet } from "react-router";
// import useSearch from "../../features/search/useSearch"
import SearchForm from "../SearchWidget/SearchForm"

interface LayoutProps {
    setQuery: (value: string) => void
}

const Layout = ({ setQuery }: LayoutProps) => {

    return (
        <>
            <header>
                <SearchForm setQuery={setQuery} />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout


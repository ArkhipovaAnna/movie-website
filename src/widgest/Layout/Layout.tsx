import { Outlet } from "react-router";
import SearchForm from "../SearchWidget/SearchForm"


const Layout = () => {

    return (
        <>
            <header>
                <SearchForm />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout


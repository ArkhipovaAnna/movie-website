import { Outlet } from "react-router";
import SearchForm from "../SearchWidget/SearchForm"
import HomeIcon from "@/shared/ui/HomeIcon/HomeIcon";

const Layout = () => {

    return (
        <>
            <header>
                <SearchForm />
                <HomeIcon />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout


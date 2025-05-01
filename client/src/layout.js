import Header from "./header";
import {Outlet, Link} from "react-router-dom";


export default function Layout() {
    return (
        <main>
            <Header />
            <Outlet />
        </main>
    );
}
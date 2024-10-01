import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";
import { LayoutComponent } from "./styles";

export function DefaultLayout() {
    return (

        <LayoutComponent>
            <Header />
            <Outlet />
        </LayoutComponent>

    )
}
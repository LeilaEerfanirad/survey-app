import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="flex h-screen flex-col">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

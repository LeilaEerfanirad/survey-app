import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AuthLayout() {
    return (
        <div className="flex h-screen flex-col">
            <ToastContainer bodyStyle={{
                direction: "rtl"
            }} style={{
                fontSize: "14px",
                direction: "rtl",
                textAlign: "right"
            }} />
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

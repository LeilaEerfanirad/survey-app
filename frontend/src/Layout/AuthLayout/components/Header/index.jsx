import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import logo from "Assets/images/sbu_logo.png";
import { Link } from "react-router-dom";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="shadow-md w-full sticky top-0 left-0 z-50">
            <div className="md:flex items-center justify-between bg-blue-700 py-2 md:px-10 px-7">
                <div
                    onClick={() => setOpen(!open)}
                    className="text-3xl absolute left-8 top-2 cursor-pointer md:hidden"
                >
                    {open ? (
                        <XMarkIcon className="w-12 h-12 text-white cursor-pointer mx-2 md:hidden block" />
                    ) : (
                        <Bars3Icon className="w-12 h-12 text-white cursor-pointer mx-2 md:hidden block" />
                    )}
                </div>

                <ul
                    className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-blue-700 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? "top-20 " : "top-[-490px]"
                        }`}
                >
                    <Link
                        to="/login"
                        className="text-white hover:text-blue-700  hover:bg-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg min-[810px]:text-base md:text-sm min-[810px]:px-5 min-[810px]:py-2.5 md:p-2 py-2.5 px-5 text-center mr-2 md:ml-8 duration-500"
                    >
                        سامانه ساخت نظرسنجی دانشگاه شهید بهشتی
                    </Link>
                </ul>
                <div className="font-bold text-white text-2xl cursor-pointer flex items-center font-[Poppins]">
                    <Link to="/">
                        <img width={80} height={80} src={logo} alt="logo" />
                    </Link>
                </div>
            </div>
        </header>
    );
}

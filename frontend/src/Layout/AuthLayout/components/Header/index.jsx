import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import logo from "Assets/images/sbu_logo.png";
import { Link } from "react-router-dom";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="shadow-md w-full sticky top-0 left-0 z-50">
            <div className="flex md:flex-row flex-col-reverse items-center justify-between bg-blue-700 py-2 md:px-10 px-7">
                <p
                    className="text-white hover:text-blue-700  hover:bg-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg min-[810px]:text-base md:text-sm min-[810px]:px-5 min-[810px]:py-2.5 md:p-2 py-2.5 px-5 text-center mr-2 md:ml-8 duration-500"
                >
                    سامانه ساخت نظرسنجی دانشگاه شهید بهشتی
                </p>
                <div className="font-bold text-white text-2xl cursor-pointer flex items-center font-[Poppins]">
                    <Link to="/">
                        <img width={80} height={80} src={logo} alt="logo" />
                    </Link>
                </div>
            </div>
        </header>
    );
}

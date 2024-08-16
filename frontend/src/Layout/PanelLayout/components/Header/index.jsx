import { Bars3Icon } from "@heroicons/react/24/solid";
// import { useThemeStore } from "Store/useThemeStore";
import { useMediaQuery } from "@react-hook/media-query";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Button } from 'antd'


import { toggleCompactDrawer, toggleOpenDrawer } from '../../../../redux/features/settingsSlice'
import { EyeIcon, UserIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
export default function Header() {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    //   const toggleCompactDrawer = useThemeStore(
    //     (state) => state.toggleCompactDrawer
    //   );
    //   const toggleOpenDrawer = useThemeStore((state) => state.toggleOpenDrawer);


    const dispatch = useDispatch()

    //   const lo = localStorage.getItem("userInfo") || "";

    //   const [userData, setUserData] = useState({
    //     username: "",
    //   });

    //   useEffect(() => {
    //     if (lo) {
    //       const userInfo = JSON.parse(localStorage.getItem("userInfo") || "");

    //       setUserData(userInfo);
    //     }
    //   }, []);

    const handleToggleDrawer = () => {
        if (isDesktop) {
            dispatch(toggleCompactDrawer());
        } else {
            dispatch(toggleOpenDrawer());
        }
    };

    return (
        <header className="shadow-md sticky top-0 left-0 duration-200 z-40">
            <div className="flex items-center justify-between bg-white p-4 border border-red-400">
                <Bars3Icon
                    onClick={handleToggleDrawer}
                    className="w-8 h-8 text-blue-500 cursor-pointer mx-2"
                />


            </div>
        </header>
    );
}

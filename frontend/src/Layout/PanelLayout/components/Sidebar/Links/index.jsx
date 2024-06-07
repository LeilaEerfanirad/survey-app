import {
    RectangleGroupIcon,
    ClipboardDocumentListIcon,
    UserCircleIcon,
    ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { CubeTransparentIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

export default function Links() {
    const navgate = useNavigate();
    const { isCompact } = useSelector((state) => state.settings.layout.drawer)

    const linkList = [
        { title: "داشبورد", path: `dashboard`, Icon: RectangleGroupIcon },
        {
            title: "لیست نظرسنجی‌ها",
            path: "mysurveys",
            Icon: ClipboardDocumentListIcon,
        },
        {
            title: "پروفایل",
            path: "profile",
            Icon: UserCircleIcon,
        },

        { title: "خروج", path: "exit", Icon: ArrowLeftOnRectangleIcon },
    ];

    const toggleLogout = () => {
        localStorage.clear();
        navgate("/");
    };

    const activeLinkClass =
        "text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 bg-blue-500 hover:bg-blue-600 border-b-4 border-blue-600 hover:border-blue-700 duration-300 rounded-lg";
    const inactiveLinkClass =
        "text-gray-800 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-zinc-100 border-b-4 border-white hover:border-zinc-200 duration-300 rounded-lg";

    return (
        <ul className="pt-5 space-y-3">
            {linkList.map((link) => {
                if (link.title === "خروج") {
                    return (
                        <div
                            onClick={toggleLogout}
                            className={inactiveLinkClass}
                            key={link.title}
                        >
                            <link.Icon
                                className={`${!isCompact ? "md:w-full" : ""} w-8 h-8`}
                            />
                            <span
                                className={`${!isCompact ? "md:hidden" : ""
                                    } font-semibold origin-left duration-200`}
                            >
                                {link.title}
                            </span>
                        </div>
                    );
                }

                return (
                    <NavLink
                        to={link.path}
                        key={link.title}
                        className={({ isActive }) =>
                            isActive ? activeLinkClass : inactiveLinkClass
                        }
                    >
                        <link.Icon
                            className={`${!isCompact ? "md:w-full" : ""} w-8 h-8`}
                        />
                        <span
                            className={`${!isCompact ? "md:hidden" : ""
                                } font-semibold origin-left duration-200`}
                        >
                            {link.title}
                        </span>
                    </NavLink>
                );
            })}
        </ul>
    );
}

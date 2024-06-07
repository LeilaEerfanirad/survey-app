import logo from "Assets/images/sbu_logo.png";
import Links from "./Links";
import { Link } from "react-router-dom";

import { toggleOpenDrawer } from '../../../../redux/features/settingsSlice'
import { useDispatch, useSelector } from "react-redux";

export default function Sidebar() {

  const dispatch = useDispatch()
  const { isCompact,
    isOpen } = useSelector((state) => state.settings.layout.drawer)

  return (
    <>
      <div
        onClick={() => dispatch(toggleOpenDrawer())}
        className={`${isOpen ? "hidden" : "block"
          } md:hidden fixed w-full h-screen top-0 right-0 z-50 bg-zinc-900/50`}
      ></div>
      <aside
        className={`${isCompact ? "md:w-64 p-5" : "md:w-20 p-3"} ${isOpen ? "translate-x-full" : "translate-x-0"
          } w-64 overflow-y-auto md:translate-x-0 fixed duration-300 h-screen pt-8 bg-white shadow-lg z-50`}
      >
        <div className="flex gap-x-4 justify-start items-center border-b-2 border-zinc-200 pb-5">
          <Link
            to="/"
            target="_blank"
            className={`${isCompact ? "" : "md:absolute"}`}
          >
            <img
              width={50}
              height={50}
              src={logo}
              alt="logo"
              className={`cursor-pointer duration-500
              ${isCompact ? "rotate-[360deg]" : ""}
               `}
            />
          </Link>
          <h1
            className={`text-gray-900 whitespace-nowrap origin-left font-medium text-xl duration-300 ${!isCompact ? "md:scale-0" : ""
              }`}
          >
            سامانه نظرسنجی
          </h1>
        </div>
        <Links />
      </aside>
    </>
  );
}

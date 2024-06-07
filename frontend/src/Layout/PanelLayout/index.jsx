import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function PanelLayout() {
    const { isCompact } = useSelector((state) => state.settings.layout.drawer)
    const navigate = useNavigate();
    const path = useLocation();

    const CheckUserExpired = async () => {
        const token = localStorage.getItem("access_token");

        // if (!token) {
        //   navigate("/");
        // } else {
        //   const { exp } = jwt_decode<{
        //     exp: number | undefined;
        //     userId: string;
        //   }>(token);

        //   if (exp) {
        //     if (exp * 1000 < Date.now()) {
        //       localStorage.removeItem("access_token");
        //       // localStorage.removeItem(ACCESS_TOKEN);
        //       // localStorage.removeItem(REFRESH_TOKEN);
        //       // localStorage.removeItem(IS_LOGGED_IN);
        //       navigate("/");
        //     } else {
        //       const { role } = await getSingleUser();
        //       if (role) {
        //         const lastPath = localStorage.getItem("lastPath");
        //         switch (role) {
        //           case "admin":
        //             return navigate(lastPath || "/panel/users");
        //           case "agent":
        //             return navigate(lastPath || "/agent/configs");
        //           default:
        //             return navigate(lastPath || "/user/dashboard");
        //         }
        //       } else {
        //         navigate("/");
        //       }
        //     }
        //   }
        // }
    };

    useEffect(() => {
        localStorage.setItem("lastPath", path.pathname);
    }, [path]);

    useEffect(() => {
        CheckUserExpired();
    }, []);

    return (
        <main className="h-screen flex flex-col">
            <Sidebar />
            <div
                className={`flex flex-col flex-1 ${isCompact ? "md:mr-[256px]" : "md:mr-20"
                    } `}
            >
                <Header />
                <section className="px-4 border border-purple-500 md:px-14 py-10 flex-1">
                    <Outlet />
                </section>
            </div>
        </main>
    );
}

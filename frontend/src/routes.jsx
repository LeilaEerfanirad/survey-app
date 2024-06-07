import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./Layout/AuthLayout";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import PanelLayout from "./Layout/PanelLayout";
import SurveyBuilder from "./Pages/Panel/SurveyBuilder";


const AuthRoutes = [
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/",
                element: <LoginPage />,
            },
            {
                path: "/signup",
                element: <SignupPage />,
            },
        ],
    },
];

const PanelRoutes = [
    {
        path: "/panel",
        element: <PanelLayout />,
        children: [
            {
                path: "survey-builder",
                element: <SurveyBuilder />,
            },
            // {
            //     path: "/signup",
            //     element: <SignupPage />,
            // },
        ],
    },
];



const AppRoutes = createBrowserRouter([...AuthRoutes, ...PanelRoutes]);


export default function Routes() {
    return <RouterProvider router={AppRoutes} />;
}
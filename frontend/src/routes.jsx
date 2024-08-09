import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./Layout/AuthLayout";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import PanelLayout from "./Layout/PanelLayout";
import SurveyBuilder from "./Pages/Panel/SurveyBuilder";
import DashboardPage from "./Pages/Panel/DashboardPage";


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
                path: "dashboard",
                element: <DashboardPage />,
            },
            {
                path: "survey/:surveyId",
                element: <SurveyBuilder />,
            },
        ],
    },
];



const AppRoutes = createBrowserRouter([...AuthRoutes, ...PanelRoutes]);


export default function Routes() {
    return <RouterProvider router={AppRoutes} />;
}
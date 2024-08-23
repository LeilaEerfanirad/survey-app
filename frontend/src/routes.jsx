import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./Layout/AuthLayout";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import PanelLayout from "./Layout/PanelLayout";
import SurveyBuilder from "./Pages/Panel/SurveyBuilder";
import DashboardPage from "./Pages/Panel/DashboardPage";
import SurveyPage from "./Pages/Survey";
import ReportPage from "./Pages/Panel/Report";


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
            {
                path: "report/:questionId",
                element: <ReportPage />,
            },
        ],
    },
];

const SurveyRoutes = [

    {
        path: "/survey/:surveyId",
        element: <SurveyPage />,
        // children: [
        //     {
        //         path: "dashboard",
        //         element: <DashboardPage />,
        //     },
        //     {
        //         path: "survey/:surveyId",
        //         element: <SurveyBuilder />,
        //     },
        // ],
    },

]



const AppRoutes = createBrowserRouter([...AuthRoutes, ...PanelRoutes, ...SurveyRoutes]);


export default function Routes() {
    return <RouterProvider router={AppRoutes} />;
}
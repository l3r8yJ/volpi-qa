import {lazy, ReactElement} from "react";
import {Navigate} from "react-router-dom";
import {UnknownQuestions} from "../pages/UnknownQuestions";

const Categories = lazy(() => import("../pages/Categories"))
const CategoryName = lazy(() => import("../pages/CategoryName"))
const Login = lazy(() => import("../pages/Login"))

interface IRoute {
    path: string
    element: ReactElement
}

export const notAuthorizedRoutes: IRoute[] = [
    {path: "/login", element: <Login/>},
    {path: "*", element: <Navigate to={"/login"}/>}
]

export const authorizedRoutes: IRoute[] = [
    {path: "/", element: <Categories/>},
    {path: "/categories/:name", element: <CategoryName/>},
    {path: "/unknown-questions", element: <UnknownQuestions/>},
    {path: "*", element: <Navigate to={"/"}/>}
]

import {lazy, ReactElement} from "react";
import {Login} from "../pages/Login";
import {Navigate} from "react-router-dom";
const Categories = lazy(() => import("../pages/Categories"))
const CategoryName = lazy(() => import("../pages/CategoryName"))

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
    {path: "*", element: <Navigate to={"/"}/>}
]

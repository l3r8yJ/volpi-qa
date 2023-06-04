import {lazy, ReactElement} from "react";

const Categories = lazy(() => import("../pages/Categories"))
const CategoryName = lazy(() => import("../pages/CategoryName"))

interface IRoute {
    path: string
    element: ReactElement
}

export const authorizedRoutes: IRoute[] = [
    {path: "/", element: <Categories/>},
    {path: "/categories/:username", element: <CategoryName/>}
]

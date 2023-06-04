import React, {FC, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {authorizedRoutes, notAuthorizedRoutes} from "../constants/routes";
import {SimpleLayout} from "./layouts/SimpleLayout";
import {useAppSelector} from "../hooks/redux";

export const AppRouter: FC = () => {
    const {isAuth} = useAppSelector(state => state.auth)
    let routes = isAuth ? authorizedRoutes : notAuthorizedRoutes
    return (
        <Routes>
            {routes.map((route) => (
                <Route
                    path={route.path}
                    element={
                        <Suspense fallback={<SimpleLayout/>}>{route.element}</Suspense>
                    }
                    key={route.path}/>
            ))}
        </Routes>
    );
}

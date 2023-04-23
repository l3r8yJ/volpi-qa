import React, {FC, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {authorizedRoutes} from "../constants/routes";
import {SimpleLayout} from "./layouts/SimpleLayout";

export const AppRouter: FC = () => {
    return (
        <Routes>
            {authorizedRoutes.map((route) => (
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

import {configureStore} from "@reduxjs/toolkit";
import categoryReducer from "./reducers/categorySlice";


export const store = configureStore({
    reducer:{
        category: categoryReducer
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

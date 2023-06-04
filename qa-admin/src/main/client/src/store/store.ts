import {configureStore} from "@reduxjs/toolkit";
import categoryReducer from "./reducers/categorySlice";
import questionReducer from "./reducers/questionSlice";
import {authReducer} from "./reducers/authSlice";

export const createStore = () => configureStore({
    reducer: {
        category: categoryReducer,
        question: questionReducer,
        auth: authReducer
    }
})


export const store = createStore()

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

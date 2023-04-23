import {configureStore} from "@reduxjs/toolkit";
import categoryReducer from "./reducers/categorySlice";
import questionReducer from "./reducers/questionSlice";


export const store = configureStore({
    reducer:{
        category: categoryReducer,
        question: questionReducer
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

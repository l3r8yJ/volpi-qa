import {configureStore} from "@reduxjs/toolkit";
import {questionReducer} from "./reducers/questionSlice"
import {categoryReducer} from "./reducers/categorySlice";


export const store = configureStore({
    reducer:{
        question: questionReducer,
        category: categoryReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

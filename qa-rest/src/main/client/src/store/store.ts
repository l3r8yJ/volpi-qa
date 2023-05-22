import {configureStore} from "@reduxjs/toolkit";
import {questionReducer} from "./reducers/questionSlice"
import {categoryReducer} from "./reducers/categorySlice";
import {viewReducer} from "./reducers/viewSlice";
import {modalReducer} from "./reducers/modalSlice";


export const store = configureStore({
    reducer:{
        question: questionReducer,
        category: categoryReducer,
        view: viewReducer,
        modal: modalReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

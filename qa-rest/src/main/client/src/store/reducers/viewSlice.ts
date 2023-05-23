import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICategory} from "../../types/ICategory";

interface ViewState {
    currentCategory: ICategory | null
}

const initialState: ViewState = {
    currentCategory: null
}

const viewSlice = createSlice({
    name: "view",
    initialState,
    reducers:{
        setCurrentCategory:(state, action:PayloadAction<ICategory | null>) => {
            state.currentCategory = action.payload
        }
    }
})

export const viewReducer = viewSlice.reducer

export const {setCurrentCategory} = viewSlice.actions
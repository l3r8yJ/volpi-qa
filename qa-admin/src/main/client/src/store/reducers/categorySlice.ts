import {ICategory} from "../../types/ICategory";
import {createSlice} from "@reduxjs/toolkit";
import {fetchCategories} from "../actions/categoryAction";


interface CategoryState {
    categories: ICategory[]
    loading: "idle" | "pending" | "succeeded" | "failed"
}

const initialState:CategoryState = {
    categories: [],
    loading: "idle",
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchCategories.pending, (state) =>{
            state.loading = "pending"
        }).addCase(fetchCategories.fulfilled, (state, action) =>{
            state.loading = "succeeded"
            state.categories = action.payload
        }).addCase(fetchCategories.rejected, (state, action) =>{
            state.loading = "failed"
            console.log(action.error);
        })
    }
})

export default categorySlice.reducer

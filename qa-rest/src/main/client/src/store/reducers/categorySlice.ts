import {ICategory} from "../../types/ICategory";
import {createSlice} from "@reduxjs/toolkit";
import {fetchAllCategories, fetchCategoryById, fetchCategoryByName} from "../actions/categoryAction";


interface CategoryState {
    categories: ICategory[]
    loading: "idle" | "pending" | "succeeded" | "failed"
    currentCategory: ICategory
}

const initialState: CategoryState = {
    categories: [],
    loading: "idle",
    currentCategory: {} as ICategory
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchAllCategories.pending, (state) => {
            state.loading = "pending"
        }).addCase(fetchAllCategories.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.categories = action.payload
        }).addCase(fetchAllCategories.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error);
        })

        builder.addCase(fetchCategoryById.pending, (state) => {
            state.loading = "pending"
        }).addCase(fetchCategoryById.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.currentCategory = action.payload
        }).addCase(fetchCategoryById.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error);
        })

        builder.addCase(fetchCategoryByName.pending, (state) => {
            state.loading = "pending"
        }).addCase(fetchCategoryByName.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.currentCategory = action.payload
        }).addCase(fetchCategoryByName.rejected, (state,action) => {
            state.loading = "failed"
            console.log(action.error);
        })
    }
})

export const categoryReducer = categorySlice.reducer

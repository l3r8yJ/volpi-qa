import {ICategory} from "../../types/ICategory";
import {createSlice} from "@reduxjs/toolkit";
import {
    createCategory,
    deleteCategory,
    fetchCategories,
    fetchCategoryByName,
    updateCategory
} from "../actions/categoryAction";


interface CategoryState {
    categories: ICategory[]
    currentCategory: ICategory
    loading: "idle" | "pending" | "succeeded" | "failed"
}

const initialState:CategoryState = {
    categories: [],
    currentCategory: {} as ICategory,
    loading: "idle",
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = "pending"
        }).addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.categories = action.payload
        }).addCase(fetchCategories.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error);
        })

        builder.addCase(fetchCategoryByName.pending, (state) => {
            state.loading = "pending"
        }).addCase(fetchCategoryByName.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.currentCategory = action.payload
        }).addCase(fetchCategoryByName.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error)
        })

        builder.addCase(createCategory.pending, (state) => {
            state.loading = "pending"
        }).addCase(createCategory.fulfilled, (state) => {
            state.loading = "succeeded"
        }).addCase(createCategory.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error)
        })

        builder.addCase(updateCategory.pending, (state) => {
            state.loading = "pending"
        }).addCase(updateCategory.fulfilled, (state) => {
            state.loading = "succeeded"
        }).addCase(updateCategory.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error)
        })

        builder.addCase(deleteCategory.pending, (state) => {
            state.loading = "pending"
        }).addCase(deleteCategory.fulfilled, (state) => {
            state.loading = "succeeded"
        }).addCase(deleteCategory.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error)
        })
    }
})

export default categorySlice.reducer

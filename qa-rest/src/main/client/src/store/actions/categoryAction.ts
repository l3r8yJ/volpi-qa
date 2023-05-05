import {createAsyncThunk} from "@reduxjs/toolkit";
import {CategoryService} from "../../services/CategoryService";


export const fetchAllCategories = createAsyncThunk("categories/fetchAll", async () => {
    const res = await CategoryService.fetchAllCategories()
    return res.data
})

export const fetchCategoryById = createAsyncThunk("categories/fetchById", async (id: number) => {
    const res = await CategoryService.fetchCategoryById(id)
    return res.data
})

export const fetchCategoryByName = createAsyncThunk("categories/fetchByName", async (categoryName: string) => {
    const res = await CategoryService.fetchCategoryByName(categoryName)
    return res.data
})

import {createAsyncThunk} from "@reduxjs/toolkit";
import {CategoryService} from "../../services/CategoryService";
import {ICategory} from "../../types/ICategory";


export const fetchCategories = createAsyncThunk("categories/getAll",
    async () => {
        const res = await CategoryService.fetchAllCategories()
        return res.data
    })

export const fetchCategoryByName = createAsyncThunk("category/getByName",
    async (name: string) => {
        const res = await CategoryService.fetchCategoryByName(name)
        return res.data
    })

export const createCategory = createAsyncThunk("categories/create",
    async (name: string) => {
        const res = await CategoryService.createCategory(name)
        return res.data
    })

export const updateCategory = createAsyncThunk("categories/update",
    async (updatedCategory: ICategory) => {
        const res = await CategoryService.updateCategory(updatedCategory)
        return res.data
    })

export const deleteCategory = createAsyncThunk("categories/delete",
    async (id: number) => {
        const res = await CategoryService.deleteCategory(id)
        return res.data
    })

export const fetchCategoriesNames = createAsyncThunk("categories/getNames",
    async () => {
        const res = await CategoryService.fetchCategoriesNames()
        return res.data
    })

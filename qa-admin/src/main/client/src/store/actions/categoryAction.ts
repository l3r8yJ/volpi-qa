import {createAsyncThunk} from "@reduxjs/toolkit";
import {CategoryService} from "../../services/CategoryService";


export const fetchCategories = createAsyncThunk("categories",
    async () => {
        const res = await CategoryService.fetchAllCategories()
        return res.data
    })

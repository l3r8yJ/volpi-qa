import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthService} from "../../services/AuthService";
import {AuthRequest} from "../../types/Auth";

export const auth = createAsyncThunk("auth", async (authRequest: AuthRequest) => {
    try {
        const res = await AuthService.auth(authRequest)
        return res.data
    } catch (e: any) {
        throw new Error(e.response?.data) || "Неизвестная ошибка"
    }
})
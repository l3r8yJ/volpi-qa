import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthService} from "../../services/AuthService";
import {AuthRequest} from "../../types/Auth";

export const register = createAsyncThunk("register", async (authRequest: AuthRequest) => {
    const res = await AuthService.register(authRequest)
    return res.data
})

export const auth = createAsyncThunk("auth", async (authRequest: AuthRequest) => {
    const res = await AuthService.auth(authRequest)
    return res.data
})
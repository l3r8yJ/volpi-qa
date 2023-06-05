import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthService} from "../../services/AuthService";
import {AuthRequest} from "../../types/Auth";

export const auth = createAsyncThunk("auth", async (authRequest: AuthRequest) => {
    const res = await AuthService.auth(authRequest)
    return res.data
})
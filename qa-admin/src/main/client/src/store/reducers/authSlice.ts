import {createSlice} from "@reduxjs/toolkit";
import {UserAuth} from "../../types/Auth";
import {auth, register} from "../actions/authAction";
import {Simulate} from "react-dom/test-utils";

interface AuthState extends UserAuth {
    loading: "idle" | "pending" | "succeeded" | "failed"
}

const initialState: AuthState = {
    isAuth: false,
    loading: "idle",
    token: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = "pending"
        }).addCase(register.fulfilled, (state, action) => {
            state.token = action.payload
            state.loading = "succeeded"
        }).addCase(register.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error)
        })
        builder.addCase(auth.pending, (state) => {
            state.loading = "pending"
        }).addCase(auth.fulfilled, (state, action) => {
            state.token = action.payload
            state.loading = "succeeded"
            state.isAuth = true
        }).addCase(auth.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error)
        })
    }

})

export const authReducer = authSlice.reducer
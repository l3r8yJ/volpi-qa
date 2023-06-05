import {createSlice} from "@reduxjs/toolkit";
import {UserAuth} from "../../types/Auth";
import {auth, register} from "../actions/authAction";

interface AuthState extends UserAuth {
    loading: "idle" | "pending" | "succeeded" | "failed"
}

const initialState = (): AuthState => {
    const token = localStorage.getItem("token");
    return {
        isAuth: false,
        loading: "idle",
        token
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = "pending"
        }).addCase(register.fulfilled, (state, action) => {
            state.token = action.payload.token
            state.loading = "succeeded"
        }).addCase(register.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error)
        })
        builder.addCase(auth.pending, (state) => {
            state.loading = "pending"
        }).addCase(auth.fulfilled, (state, action) => {
            console.log(action.payload)
            state.token = action.payload.token
            state.loading = "succeeded"
            state.isAuth = true
            state.token && localStorage.setItem("token", state.token)
        }).addCase(auth.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error)
        })
    }

})

export const authReducer = authSlice.reducer
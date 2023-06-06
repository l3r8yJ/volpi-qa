import {createSlice} from "@reduxjs/toolkit";
import {UserAuth} from "../../types/Auth";
import {auth} from "../actions/authAction";

interface AuthState extends UserAuth {
    loading: "idle" | "pending" | "succeeded" | "failed"
    error: string | null
}

const initialState = (): AuthState => {
    const token = localStorage.getItem("token");
    let isAuth = false
    if(token && token.length !== 0)
        isAuth = true
    return {
        isAuth,
        loading: "idle",
        token,
        error: null
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signOut(state){
            localStorage.removeItem("token")
            state.isAuth = false
            state.token = null
            state.loading = "idle"
        },
        clearTheError(state){
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(auth.pending, (state) => {
            state.loading = "pending"
        }).addCase(auth.fulfilled, (state, action) => {
            state.token = action.payload.token
            state.loading = "succeeded"
            state.isAuth = true
            state.token && localStorage.setItem("token", state.token)
            state.error = null
        }).addCase(auth.rejected, (state, action) => {
            state.loading = "failed"
            state.error = action.error.code || null
            console.log(action.error)
        })
    }
})

export const authReducer = authSlice.reducer

export const {signOut, clearTheError} = authSlice.actions
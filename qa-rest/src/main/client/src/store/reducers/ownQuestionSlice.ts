import {createSlice} from "@reduxjs/toolkit";

interface OwnQuestionState {
    loading: "idle" | "pending" | "succeeded" | "failed"
    isActiveForm: boolean
    isQuestionSent: boolean
}

const initialState: OwnQuestionState = {
    loading: "idle",
    isActiveForm: false,
    isQuestionSent: false
}

const ownQuestionSlice = createSlice({
    name: "ownQuestion",
    initialState,
    reducers: {
        toggleForm: (state) => {
            state.isActiveForm = !state.isActiveForm
        },
        setIsSentQuestion: (state, action) => {
            state.isQuestionSent = action.payload
        }
    }
})

export const ownQuestionReducer = ownQuestionSlice.reducer

export const {toggleForm, setIsSentQuestion} = ownQuestionSlice.actions
import {createSlice} from "@reduxjs/toolkit";
import {IQuestion} from "../../types/IQuestion";
import {
    fetchAllQuestions,
    fetchQuestionById,
    fetchQuestionByText,
    fetchQuestionsByCategory
} from "../actions/questionAction";

interface QuestionState {
    questions: IQuestion[]
    loading: "idle" | "pending" | "succeeded" | "failed"
    currentQuestion: IQuestion
}

const initialState:QuestionState = {
    questions: [],
    loading: "idle",
    currentQuestion: {} as IQuestion
}

const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchAllQuestions.pending, (state) => {
            state.loading = "pending"
        }).addCase(fetchAllQuestions.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.questions = action.payload
        }).addCase(fetchAllQuestions.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error)
        })

        builder.addCase(fetchQuestionById.pending, (state) => {
            state.loading = "pending"
        }).addCase(fetchQuestionById.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.currentQuestion = action.payload
        }).addCase(fetchQuestionById.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error);
        })

        builder.addCase(fetchQuestionsByCategory.pending, (state) => {
            state.loading = "pending"
        }).addCase(fetchQuestionsByCategory.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.questions = action.payload
        }).addCase(fetchQuestionsByCategory.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error);
        })

        builder.addCase(fetchQuestionByText.pending, (state) => {
            state.loading = "pending"
        }).addCase(fetchQuestionByText.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.currentQuestion = action.payload
        }).addCase(fetchQuestionByText.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error);
        })
    }
})

export const questionReducer =  questionSlice.reducer

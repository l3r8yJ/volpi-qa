import {createSlice} from "@reduxjs/toolkit";
import {IQuestion} from "../../types/IQuestion";
import {
    createOwnQuestion,
    fetchAllQuestions,
    fetchQuestionById,
    fetchQuestionByText,
    fetchQuestionsByCategory
} from "../actions/questionAction";

interface QuestionState {
    questions: IQuestion[]
    loading: "idle" | "pending" | "succeeded" | "failed"
    currentQuestion: IQuestion,
    isActiveForm: boolean
    isQuestionSent: boolean
    error: null | string
}

const initialState: QuestionState = {
    questions: [],
    loading: "idle",
    currentQuestion: {} as IQuestion,
    isActiveForm: false,
    isQuestionSent: false,
    error: null
}

const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        toggleForm: (state) => {
            state.isActiveForm = !state.isActiveForm
            state.isQuestionSent = false
        },
    },
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

        builder.addCase(createOwnQuestion.pending, (state) => {
            state.loading = "pending"
        }).addCase(createOwnQuestion.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.isQuestionSent = true
            state.error = null
        }).addCase(createOwnQuestion.rejected, (state, action) => {
            state.loading = "failed"
            state.error = action.error.message || "Что-то пошло не так"
            console.log(action.error)
        })
    }
})

export const questionReducer = questionSlice.reducer

export const {toggleForm} = questionSlice.actions

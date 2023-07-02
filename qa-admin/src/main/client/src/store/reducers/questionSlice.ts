import {IQuestion, UnknownQuestion} from "../../types/IQuestion";
import {createSlice} from "@reduxjs/toolkit";
import {
    createQuestion,
    deleteQuestion,
    fetchAllQuestions,
    fetchQuestionById,
    fetchQuestionsByCategory, fetchUnknownQuestions,
    updateQuestion
} from "../actions/questionAction";
import {ac} from "vitest/dist/types-e3c9754d";

interface QuestionState {
    questions: IQuestion[]
    currentQuestion: IQuestion
    loading: "idle" | "pending" | "succeeded" | "failed"
    unknownQuestions: UnknownQuestion[]
}

const initialState: QuestionState = {
    questions: [],
    currentQuestion: {} as IQuestion,
    loading: "idle",
    unknownQuestions: []
}

const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        clearQuestions(state) {
            state.questions = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllQuestions.pending, (state) => {
            state.loading = "pending"
        }).addCase(fetchAllQuestions.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.questions = action.payload
        }).addCase(fetchAllQuestions.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error);
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

        builder.addCase(createQuestion.pending, (state) => {
            state.loading = "pending"
        }).addCase(createQuestion.fulfilled, (state) => {
            state.loading = "succeeded"
        }).addCase(createQuestion.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error);
        })

        builder.addCase(deleteQuestion.pending, (state) => {
            state.loading = "pending"
        }).addCase(deleteQuestion.fulfilled, (state) => {
            state.loading = "succeeded"
        }).addCase(deleteQuestion.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error);
        })

        builder.addCase(updateQuestion.pending, (state) => {
            state.loading = "pending"
        }).addCase(updateQuestion.fulfilled, (state) => {
            state.loading = "succeeded"
        }).addCase(updateQuestion.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error);
        })

        builder.addCase(fetchQuestionsByCategory.pending, (state) => {
            state.loading = "pending"
        }).addCase(fetchQuestionsByCategory.fulfilled, (state, action) => {
            state.questions = action.payload
            state.loading = "succeeded"
        }).addCase(fetchQuestionsByCategory.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error);
        })

        builder.addCase(fetchUnknownQuestions.pending, (state) => {
            state.loading = "pending"
        }).addCase(fetchUnknownQuestions.fulfilled, (state, action) => {
            state.unknownQuestions = action.payload
            state.loading = "succeeded"
        }).addCase(fetchUnknownQuestions.rejected, (state, action) => {
            state.loading = "failed"
            console.log(action.error)
        })
    }
})

export default questionSlice.reducer

export const {clearQuestions} = questionSlice.actions

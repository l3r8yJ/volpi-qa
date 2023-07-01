import {createAsyncThunk} from "@reduxjs/toolkit";
import {QuestionService} from "../../services/QuestionService";
import {OwnQuestion} from "../../types/ownQuestion";


export const fetchAllQuestions = createAsyncThunk("questions/fetchAll", async () => {
    const res = await QuestionService.fetchAllQuestions()
    return res.data
})

export const fetchQuestionById = createAsyncThunk("questions/fetchById", async (id: number) => {
    const res = await QuestionService.fetchQuestionById(id)
    return res.data
})

export const fetchQuestionsByCategory = createAsyncThunk("questions/fetchByCategory", async (categoryName: string) => {
    const res = await QuestionService.fetchQuestionsByCategory(categoryName)
    return res.data
})

export const fetchQuestionByText = createAsyncThunk("questions/fetchByText", async (text: string) => {
    const res = await QuestionService.fetchQuestionByText(text)
    return res.data
})

export const createOwnQuestion = createAsyncThunk("questions/createOwnQuestion", async (ownQuestion:OwnQuestion) => {
    const res = await QuestionService.createOwnQuestion(ownQuestion)
    return res.data
})

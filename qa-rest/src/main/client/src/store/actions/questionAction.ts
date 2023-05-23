import {createAsyncThunk} from "@reduxjs/toolkit";
import {QuestionService} from "../../services/QuestionService";


export const fetchAllQuestions = createAsyncThunk("questions/fetchAll", async() => {
    const res = await QuestionService.fetchAllQuestions()
    return res.data
})

export const fetchQuestionById = createAsyncThunk("questions/fetchById", async(id: number) => {
    const res = await QuestionService.fetchQuestionById(id)
    return res.data
})

export const fetchQuestionsByCategory = createAsyncThunk("questions/fetchByCategory", async (categoryName:string) => {
    const res = await QuestionService.fetchQuestionsByCategory(categoryName)
    return res.data
})

export const fetchQuestionByText = createAsyncThunk("questions/fetchByText", async (text: string) => {
    const res = await QuestionService.fetchQuestionByText(text)
    return res.data
})

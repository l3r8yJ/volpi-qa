import {createAsyncThunk} from "@reduxjs/toolkit";
import {QuestionService} from "../../services/QuestionService";
import {IQuestion, IQuestionNoID} from "../../types/IQuestion";

export const fetchAllQuestions = createAsyncThunk("questions/getAll", async () => {
    const res = await QuestionService.fetchAllQuestions()
    return res.data
})

export const fetchQuestionById = createAsyncThunk("questions/getById", async (id: number) => {
    const res = await QuestionService.fetchQuestionById(id)
    return res.data
})

export const createQuestion = createAsyncThunk("questions/create", async (question: IQuestionNoID) => {
    const res = await QuestionService.createQuestion(question)
    return res.data
})

export const deleteQuestion = createAsyncThunk("questions/delete", async(id: number) => {
    const res = await QuestionService.deleteQuestion(id)
    return res.data
})

export const updateQuestion = createAsyncThunk("questions/update", async (question: IQuestion) => {
    const res = await QuestionService.updateQuestion(question)
    return res.data
})

export const fetchQuestionsByCategory = createAsyncThunk("questions/getByCategory", async(categoryName: string) => {
    const res = await QuestionService.fetchQuestionsByCategory(categoryName)
    return res.data
})

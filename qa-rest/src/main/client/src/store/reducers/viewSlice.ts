import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICategory} from "../../types/ICategory";
import {IQuestion} from "../../types/IQuestion";
import {ENROLL_TO_VPI, ENROLL_TO_VPI_Type} from "../../constants/vpi";


interface ViewState {
    currentView: "default" | "category" | "question"
    viewHeaderText: string | ENROLL_TO_VPI_Type
    currentCategory: ICategory | null
    currentQuestion: IQuestion | null
}

const initialState: ViewState = {
    currentView: "default",
    viewHeaderText: ENROLL_TO_VPI,
    currentCategory: null,
    currentQuestion: null
}

const viewSlice = createSlice({
    name: "view",
    initialState,
    reducers: {
        setCurrentView: (state, action: PayloadAction<"default" | "category" | "question">) => {
            state.currentView = action.payload
            state.viewHeaderText = ENROLL_TO_VPI
        },
        setCurrentCategory: (state, action: PayloadAction<ICategory | null>) => {
            state.currentCategory = action.payload
            state.viewHeaderText = action.payload?.name ?? ENROLL_TO_VPI
        },
        setCurrentQuestion: (state, action: PayloadAction<IQuestion | null>) => {
            state.currentQuestion = action.payload
            state.viewHeaderText = action.payload?.category ?? ENROLL_TO_VPI
        }
    }
})

export const viewReducer = viewSlice.reducer

export const {setCurrentView, setCurrentQuestion, setCurrentCategory} = viewSlice.actions
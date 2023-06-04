import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ModalState {
    isOpen: boolean
}

const initialState: ModalState = {
    isOpen: false
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setIsOpen: (state, action:PayloadAction<boolean>) => {
            state.isOpen = action.payload
        }
    }
})

export const modalReducer = modalSlice.reducer

export const {setIsOpen} = modalSlice.actions
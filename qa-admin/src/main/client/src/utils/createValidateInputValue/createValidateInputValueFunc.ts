import {InputHTMLAttributes} from "react";

export type ValidateInputResult =
    "выглядит хорошо!"
    | "слишком длинное"
    | "не может быть пустым"
    | "неправильный тип"
    | "уже существует"

export type ValidateInputResulFunc = (inputValue: InputHTMLAttributes<HTMLInputElement>['value']) => ValidateInputResult

type ValidateOptions = {
    maxLength?: number
    banWords?: string[]
}

export const createValidateInputValueFunc = (options?: ValidateOptions): ValidateInputResulFunc => {
    const {maxLength, banWords} = options ?? {}
    return (inputValue: InputHTMLAttributes<HTMLInputElement>['value']): ValidateInputResult => {
        if (typeof inputValue !== "string") return "неправильный тип"
        inputValue = inputValue?.trim()
        if (maxLength && inputValue.length > maxLength) return "слишком длинное"
        if (inputValue.trim().length === 0) return "не может быть пустым"
        if (banWords?.includes(inputValue)) return "уже существует"
        return "выглядит хорошо!"
    }
}

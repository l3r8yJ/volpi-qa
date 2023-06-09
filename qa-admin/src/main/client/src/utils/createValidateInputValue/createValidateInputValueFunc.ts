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

export const createValidateInputValueFunc = ({maxLength = 200, banWords}: ValidateOptions): ValidateInputResulFunc => {
    return (inputValue: InputHTMLAttributes<HTMLInputElement>['value']): ValidateInputResult => {
        if (typeof inputValue !== "string") return "неправильный тип"
        if (inputValue.length > maxLength) return "слишком длинное"
        if (inputValue.trim().length === 0) return "не может быть пустым"
        if (banWords?.includes(inputValue)) return "уже существует"
        return "выглядит хорошо!"
    }
}

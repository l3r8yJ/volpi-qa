import {InputHTMLAttributes} from "react";

export type ValidateInputResult = "выглядит хорошо!" | "слишком длинное" | "не может быть пустым" | "неправильный тип"

export type ValidateInputResulFunc = (inputValue: InputHTMLAttributes<HTMLInputElement>['value']) => ValidateInputResult

export const createValidateInputValueFunc = (maxLength: number = 200): ValidateInputResulFunc => {
    return (inputValue: InputHTMLAttributes<HTMLInputElement>['value']): ValidateInputResult => {
        if (typeof inputValue !== "string") return "неправильный тип"
        if (inputValue.length > maxLength) return "слишком длинное"
        if (inputValue.length === 0) return "не может быть пустым"
        return "выглядит хорошо!"
    }
}

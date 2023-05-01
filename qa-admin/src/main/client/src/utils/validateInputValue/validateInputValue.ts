import {InputHTMLAttributes} from "react";

type ValidateInputResult = "выглядит хорошо!" | "слишком длинное" | "не может быть пустым" | "неправильный тип"

export const validateInputValue = (inputValue: InputHTMLAttributes<HTMLInputElement>['value'], maxLength: number = 200): ValidateInputResult => {
    if(typeof inputValue !== "string") return "неправильный тип"
    if(inputValue.length > maxLength) return "слишком длинное"
    if(inputValue.length === 0) return "не может быть пустым"
    return "выглядит хорошо!"
}

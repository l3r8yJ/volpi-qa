
type ValidateInputResult = "выглядит хорошо!" | "слишком длинное" | "не может быть пустым"

export const validateInputValue = (inputValue: HTMLInputElement['value'], maxLength: number = 200): ValidateInputResult => {
    if(inputValue.length > maxLength) return "слишком длинное"
    if(inputValue.length === 0) return "не может быть пустым"
    return "выглядит хорошо!"
}

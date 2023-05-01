
export const validateInputValue = (inputValue: string, maxLength: number = 200): "выглядит хорошо!" | "слишком длинное" | "не может быть пустым" => {
    if (inputValue.length > maxLength) return "слишком длинное"
    if(inputValue.length === 0) return "не может быть пустым"
    return "выглядит хорошо!"
}

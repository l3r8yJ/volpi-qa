
export const validateInputValue = (inputValue: string, maxLength: number = 200): "success" | "too long" | "cannot be empty" => {
    if (inputValue.length > maxLength) return "too long"
    if(inputValue.length === 0) return "cannot be empty"
    return "success"
}

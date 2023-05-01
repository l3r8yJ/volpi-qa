
export const validateInputValue = (inputValue: string, maxLength: number = 200): "success" | "too long" => {
    if (inputValue.length > maxLength) return "too long"
    return "success"
}

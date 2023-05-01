
export const validateInputValue = (inputValue: string, maxLength: number): "success" | "too long" => {
    if (inputValue.length > maxLength) return "too long"
    return "success"
}

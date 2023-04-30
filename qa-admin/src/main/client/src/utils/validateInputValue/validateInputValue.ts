type ValidateInputValueReturn = {
    message: string
    ok: boolean
}

export const validateInputValue = (inputValue: string, maxLength: number): ValidateInputValueReturn => {
    if (inputValue.length > maxLength) return {message: "too long", ok: false}
    return {message: "success", ok: true}
}

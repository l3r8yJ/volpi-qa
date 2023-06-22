import {InputHTMLAttributes, useEffect, useState} from "react";
import {ValidateInputResult} from "../utils/createValidateInputValue/createValidateInputValueFunc";

type UseValidateProps = {
    setIsValid: (isValid: boolean) => void,
    validateFunc: (inputValue: InputHTMLAttributes<HTMLInputElement>['value']) => ValidateInputResult,
    value: string
}

export const useValidate = ({validateFunc, setIsValid, value}: UseValidateProps) => {
    const [validateResult, setValidateResult] = useState<ValidateInputResult>("выглядит хорошо!")

    useEffect(() => {
        setValidateResult(validateFunc(value))
    }, [value])

    useEffect(() => {
        setIsValid(validateResult === "выглядит хорошо!")
    }, [validateResult])

    return {validateResult}
}
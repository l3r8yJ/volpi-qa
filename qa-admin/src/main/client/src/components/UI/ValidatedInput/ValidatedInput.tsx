import {FC, InputHTMLAttributes, useEffect, useState} from 'react';
import {ValidateInputResult} from "../../../utils/createValidateInputValue/createValidateInputValueFunc";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    validateFunc: (inputValue: InputHTMLAttributes<HTMLInputElement>['value']) => ValidateInputResult
    setIsValid: (isValid: boolean) => void
    showValidation: boolean
}

export const ValidatedInput: FC<InputProps> = ({
                                                   className,
                                                   label,
                                                   value = "",
                                                   validateFunc,
                                                   setIsValid,
                                                   showValidation,
                                                   ...props
                                               }) => {
    const [inputStatusClasses, setInputStatusClasses] = useState("border-base/50")
    const [validateResult, setValidateResult] = useState<ValidateInputResult>("выглядит хорошо!")
    useEffect(() => {
        setValidateResult(validateFunc(value))
    }, [value])

    useEffect(() => {
        const isValid = validateResult === "выглядит хорошо!"
        if (showValidation) setInputStatusClasses(isValid ? "border-safe/50" : "border-danger/50")
        setIsValid(isValid)
    }, [validateResult, showValidation])

    return (
        <label className={"max-w-[250px]"}>
            {label && <div className={"text-pale text-sm ml-1"}>{label}</div>}
            <input
                className={`${className} px-4 py-2 rounded-lg outline-none bg-secondary border ${inputStatusClasses} w-full`}
                value={value}
                {...props}
            />
            {showValidation && <div
                className={`text-sm ${validateResult === "выглядит хорошо!" ? "text-safe/80" : "text-danger/80"}`}>{validateResult}</div>}
        </label>
    );
}

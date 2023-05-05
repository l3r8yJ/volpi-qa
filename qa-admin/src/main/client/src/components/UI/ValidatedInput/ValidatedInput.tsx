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
    const [inputStatusClasses, setInputStatusClasses] = useState("border-neutral-500/50")
    const [validateResult, setValidateResult] = useState<ValidateInputResult>("выглядит хорошо!")
    useEffect(() => {
        setValidateResult(validateFunc(value))
    }, [value])

    useEffect(() => {
        const isValid = validateResult === "выглядит хорошо!"
        if (showValidation) setInputStatusClasses(isValid ? "border-green-500/50" : "border-red-500/50")
        setIsValid(isValid)
    }, [validateResult, showValidation])

    return (
        <label className={"max-w-[250px]"}>
            {label && <div className={"text-neutral-400 text-sm ml-1"}>{label}</div>}
            <input
                className={`${className} px-4 py-2 rounded-lg outline-none bg-neutral-900 border ${inputStatusClasses} w-full`}
                value={value}
                {...props}
            />
            {showValidation && <div
                className={`text-sm ${validateResult === "выглядит хорошо!" ? "text-green-500/80" : "text-red-500/80"}`}>{validateResult}</div>}
        </label>
    );
}

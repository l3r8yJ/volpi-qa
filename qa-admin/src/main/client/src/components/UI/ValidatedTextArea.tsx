import {FC, InputHTMLAttributes, TextareaHTMLAttributes, useEffect, useState} from 'react';
import {ValidateInputResult} from "../../utils/createValidateInputValue/createValidateInputValueFunc";
import {CheckIcon} from "@heroicons/react/24/outline";

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value"> {
    label?: string
    validateFunc: (inputValue: InputHTMLAttributes<HTMLInputElement>['value']) => ValidateInputResult
    setIsValid: (isValid: boolean) => void
    isValid: boolean
    showValidation: boolean
    isPassword?: boolean
    value: string
}

export const ValidatedTextArea: FC<TextAreaProps> = ({
                                                         className,
                                                         label,
                                                         value = "",
                                                         validateFunc,
                                                         setIsValid,
                                                         showValidation,
                                                         isPassword,
                                                         ...props
                                                     }) => {
    const [statusClasses, setStatusClasses] = useState("border-base/50")
    const [validateResult, setValidateResult] = useState<ValidateInputResult>("выглядит хорошо!")
    useEffect(() => {
        setValidateResult(validateFunc(value))
    }, [value])

    useEffect(() => {
        const isValid = validateResult === "выглядит хорошо!"
        showValidation
            ? setStatusClasses(isValid ? "border-safe/50" : "border-danger/50")
            : setStatusClasses("border-border/50")
        setIsValid(isValid)
    }, [validateResult, showValidation])

    return (
        <label className="w-full">
            {label && <div className="text-pale text-sm ml-1 w-full">{label}</div>}
            <textarea
                className={`${className} px-4 py-2 outline-none rounded-lg flex h-20 items-center bg-secondary border w-full ${statusClasses}`}
                value={value}
                {...props}
            />
            {showValidation && (
                <div className={`text-sm ${validateResult === "выглядит хорошо!" ? "text-safe/80" : "text-danger/80"}`}>
                    {validateResult}
                </div>
            )}
        </label>

    );
}

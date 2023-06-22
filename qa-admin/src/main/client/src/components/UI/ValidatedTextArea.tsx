import {FC, InputHTMLAttributes, TextareaHTMLAttributes, useEffect, useState} from 'react';
import {ValidateInputResult} from "../../utils/createValidateInputValue/createValidateInputValueFunc";
import {CheckIcon} from "@heroicons/react/24/outline";
import {useValidate} from "../../hooks/useValidate";

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
                                                         isValid,
                                                         ...props
                                                     }) => {
    const {validateResult} = useValidate({setIsValid, value, validateFunc})
    const [statusClasses, setStatusClasses] = useState("border-border/50")
    useEffect(() => {
        if (showValidation) {
            if (isValid) setStatusClasses("border-safe/50")
            else setStatusClasses("border-danger/50")
        } else
            setStatusClasses("border-border/50")
    }, [isValid, showValidation])

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

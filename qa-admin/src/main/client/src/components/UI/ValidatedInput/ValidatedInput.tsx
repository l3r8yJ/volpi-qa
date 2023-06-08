import {FC, InputHTMLAttributes, useEffect, useState} from 'react';
import {ValidateInputResult} from "../../../utils/createValidateInputValue/createValidateInputValueFunc";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    validateFunc: (inputValue: InputHTMLAttributes<HTMLInputElement>['value']) => ValidateInputResult
    setIsValid: (isValid: boolean) => void
    showValidation: boolean
    isPassword?: boolean
}

export const ValidatedInput: FC<InputProps> = ({
                                                   className,
                                                   label,
                                                   value = "",
                                                   validateFunc,
                                                   setIsValid,
                                                   showValidation,
                                                   isPassword,
                                                   ...props
                                               }) => {
    const [inputStatusClasses, setInputStatusClasses] = useState("border-border/50")
    const [validateResult, setValidateResult] = useState<ValidateInputResult>("выглядит хорошо!")
    const [isShowPassword, setIsShowPassword] = useState(false)
    useEffect(() => {
        setValidateResult(validateFunc(value))
    }, [value])

    useEffect(() => {
        const isValid = validateResult === "выглядит хорошо!"
        showValidation
            ? setInputStatusClasses(isValid ? "border-safe/50" : "border-danger/50")
            : setInputStatusClasses("border-border/50")
        setIsValid(isValid)
    }, [validateResult, showValidation])

    const toggleIsShowPassword = () => {
        setIsShowPassword(prev => !prev)
    }

    return (
        <label className={"max-w-[300px]"}>
            {label && <div className={"text-pale text-sm ml-1"}>{label}</div>}
            <div className={`rounded-lg flex items-center bg-secondary border ${inputStatusClasses}`}>
                <input
                    className={`${className} px-4 py-2 bg-transparent outline-none w-full`}
                    value={value}
                    type={!isShowPassword && isPassword ? "password" : "text"}
                    {...props}
                />
                {isPassword &&
                    <div className={"mr-4 cursor-pointer"} onClick={toggleIsShowPassword}>
                        {isShowPassword
                            ? <EyeSlashIcon className={"w-5 h-5 hover:text-contrastHov"}/>
                            : <EyeIcon className={"w-5 h-5 hover:text-contrastHov"}/>
                        }
                    </div>
                }
            </div>
            {showValidation && <div
                className={`text-sm ${validateResult === "выглядит хорошо!" ? "text-safe/80" : "text-danger/80"}`}>{validateResult}</div>}
        </label>
    );
}

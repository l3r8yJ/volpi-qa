import {FC, InputHTMLAttributes, useEffect, useState} from 'react';
import {ValidateInputResult} from "../../../utils/createValidateInputValue/createValidateInputValueFunc";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import {useValidate} from "../../../hooks/useValidate";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value"> {
    label?: string
    validateFunc: (inputValue: InputHTMLAttributes<HTMLInputElement>['value']) => ValidateInputResult
    setIsValid: (isValid: boolean) => void
    isValid: boolean
    showValidation: boolean
    isPassword?: boolean
    value: string
}

export const ValidatedInput: FC<InputProps> = ({
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
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [statusClasses, setStatusClasses] = useState("border-border/50")
    useEffect(() => {
        if (showValidation) {
            if (isValid) setStatusClasses("border-safe/50")
            else setStatusClasses("border-danger/50")
        } else
            setStatusClasses("border-border/50")
    }, [isValid, showValidation])

    return (
        <label className={"w-full"}>
            {label && <div className={"text-pale text-sm ml-1"}>{label}</div>}
            <div className={`rounded-lg flex items-center bg-secondary px-4 py-2 h-[40px] border ${statusClasses}`}>
                <input
                    className={`${className} bg-transparent outline-none w-full`}
                    value={value}
                    type={!isShowPassword && isPassword ? "password" : "text"}
                    {...props}
                />
                {isPassword &&
                    <div className={"cursor-pointer"} onClick={() => setIsShowPassword(prev => !prev)}>
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

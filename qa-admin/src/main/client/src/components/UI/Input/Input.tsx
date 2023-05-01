import {FC, InputHTMLAttributes} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    validateResult?: "success" | "" | string
}

export const Input: FC<InputProps> = ({className, label, validateResult = "", ...props}) => {
    let validateResultInputClass = ""
    let validateResultDescriptionClass = ""
    switch (validateResult) {
        case "выглядит хорошо!":
            validateResultInputClass = "border-green-500/50"
            validateResultDescriptionClass = "text-sm text-green-500/80"
            break
        case "":
            validateResultInputClass = "border-neutral-500/50"
            break
        default:
            validateResultInputClass = "border-red-500/50"
            validateResultDescriptionClass = "text-sm text-red-500/80"

    }
    return (
        <>
            {label
                ? <label className={"max-w-[250px]"}>
                    <div className={"text-neutral-400 text-sm ml-1"}>{label}</div>
                    <input
                        className={`${validateResultInputClass} ${className} px-4 py-2 rounded-lg outline-none bg-neutral-900 border w-full`}
                        {...props}
                    />
                    {validateResult && <div className={validateResultDescriptionClass}>{validateResult}</div>}
                </label>
                : <div>
                    <input
                        className={className + " px-4 py-2 rounded-lg outline-none bg-neutral-900 border border-neutral-500/50 max-w-[250px]"}
                        {...props}
                    />
                    {validateResult && <div className={validateResultDescriptionClass}>{validateResult}</div>}
                </div>

            }
        </>
    );
}

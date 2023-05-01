import {FC, InputHTMLAttributes} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    validateResult?: "success" | "" | string
}

export const Input: FC<InputProps> = ({className, label, validateResult = "", ...props}) => {

    return (
        <label className={"max-w-[250px]"}>
            {label && <div className={"text-neutral-400 text-sm ml-1"}>{label}</div>}
            <input
                className={` ${className} px-4 py-2 rounded-lg outline-none bg-neutral-900 border w-full`}
                {...props}
            />
            {validateResult && <div>{validateResult}</div>}
        </label>
    );
}

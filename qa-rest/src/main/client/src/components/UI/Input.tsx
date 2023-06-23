import {FC, InputHTMLAttributes} from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label:string
}

export const Input:FC<InputProps> = ({label, className, ...props}) => {
    return (
        <label className={"w-full"}>
            <div className={"text-neutral-400 text-sm ml-2"}>{label}</div>
            <input {...props} className={`border w-full p-2 rounded-lg ${className}`}/>
        </label>
    );
};
import {FC, InputHTMLAttributes} from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string | null
}

export const Input: FC<InputProps> = ({label, className, error, ...props}) => {
    return (
        <label className={"w-full"}>
            <div className={"text-neutral-400 text-sm ml-2"}>{label}</div>
            <input {...props} className={`border w-full p-2 rounded-lg outline-none ${className} ${error? "border-red-600/50": ""}`}/>
            {error && <div className={"text-red-500 text-sm break-words"}>{error}</div>}
        </label>
    );
};
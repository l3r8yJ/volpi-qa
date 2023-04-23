import {FC, InputHTMLAttributes} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export const Input: FC<InputProps> = ({className, label, ...props}) => {
    return (
        <>
            {label
                ? <label className={"max-w-[250px]"}>
                    <div className={"text-neutral-400 text-sm ml-1"}>{label}</div>
                    <input
                        className={className + " px-4 py-2 rounded-lg outline-none bg-neutral-900 border border-neutral-500/50 w-full"}
                        {...props}
                    />
                </label>
                : <input
                    className={className + " px-4 py-2 rounded-lg outline-none bg-neutral-900 border border-neutral-500/50 max-w-[250px]"}
                    {...props}
                />
            }
        </>
    );
}

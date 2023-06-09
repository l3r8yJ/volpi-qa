import {ButtonHTMLAttributes, FC} from 'react';

export const PrimaryButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({children, className, ...props}) => {
    if(!className) className = ""
    if(!className?.includes("bg")) className += " bg-primary hover:bg-primaryHov"
    if(!className?.includes("w")) className += " w-full"
    return (
        <button
            className={`${className? className : ""} px-4 py-2 rounded-lg`} {...props}>
            {children}
        </button>
    );
}

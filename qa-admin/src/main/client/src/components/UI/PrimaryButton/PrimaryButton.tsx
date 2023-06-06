import {ButtonHTMLAttributes, FC} from 'react';

export const PrimaryButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({children, className, ...props}) => {
    if(!className?.includes("bg")) className += " bg-primary hover:bg-primaryHov"
    return (
        <button
            className={className + " px-4 py-2 rounded-lg w-full max-w-[300px]"} {...props}>
            {children}
        </button>
    );
}

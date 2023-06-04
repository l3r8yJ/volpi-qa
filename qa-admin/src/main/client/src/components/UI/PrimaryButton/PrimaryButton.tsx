import {ButtonHTMLAttributes, FC} from 'react';

export const PrimaryButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({children, className, ...props}) => {
    return (
        <button
            className={className + " bg-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-600 w-full max-w-[250px]"} {...props}>
            {children}
        </button>
    );
}

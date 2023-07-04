import {ButtonHTMLAttributes, FC} from 'react';
import {getBtnClassesByVariant} from "../../utils/getbtnClassesByVariant";

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "danger" | "safe" | "default"
}

export const SecondaryButton: FC<SecondaryButtonProps> = ({children, className, variant = "default", ...props}) => {
    if (!className) className = ""
    className += getBtnClassesByVariant(variant, "secondary")
    if (!className?.includes("w")) className += " w-full"
    return (
        <button
            className={`${className ? className : ""} bg-transparent px-4 py-2 rounded-lg text-sm duration-200`}
            {...props}
        >
            {children}
        </button>
    );
}

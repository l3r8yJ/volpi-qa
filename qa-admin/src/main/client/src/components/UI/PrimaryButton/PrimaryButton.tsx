import {ButtonHTMLAttributes, FC} from 'react';
import {getBtnClassesByVariant} from "../../../utils/getbtnClassesByVariant";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: "danger" | "safe" | "default"
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({children, className, variant = "default", ...props}) => {
    className += getBtnClassesByVariant(variant, "primary")
    if (!className?.includes("w")) className += " w-full"
    return (
        <button
            className={`${className ? className : ""} px-4 py-2 rounded-lg border text-btn-foreground text-sm`} {...props}>
            {children}
        </button>
    );
}

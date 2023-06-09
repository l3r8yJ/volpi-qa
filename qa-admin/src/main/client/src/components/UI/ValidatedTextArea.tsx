import {FC, FormEvent, InputHTMLAttributes, TextareaHTMLAttributes, useEffect, useRef, useState, KeyboardEvent} from 'react';
import {ValidateInputResult} from "../../utils/createValidateInputValue/createValidateInputValueFunc";
import {useValidate} from "../../hooks/useValidate";

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value"> {
    label?: string
    validateFunc: (inputValue: InputHTMLAttributes<HTMLInputElement>['value']) => ValidateInputResult
    setIsValid: (isValid: boolean) => void
    isValid: boolean
    showValidation: boolean
    isPassword?: boolean
    value: string
}

const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'Enter' || e.key === 'NumpadEnter')) {
        const form = e.currentTarget.form;
        if (form) {
            e.preventDefault();
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            form.dispatchEvent(submitEvent);
        }
    }
};


const handleInput = (e: FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'inherit';
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
}


export const ValidatedTextArea: FC<TextAreaProps> = ({
                                                         className,
                                                         label,
                                                         value = "",
                                                         validateFunc,
                                                         setIsValid,
                                                         showValidation,
                                                         isPassword,
                                                         isValid,
                                                         ...props
                                                     }) => {
    const {validateResult} = useValidate({setIsValid, value, validateFunc})
    const [statusClasses, setStatusClasses] = useState("border-border/50")
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (showValidation) {
            if (isValid) setStatusClasses("border-safe/50")
            else setStatusClasses("border-danger/50")
        } else
            setStatusClasses("border-border/50")
    }, [isValid, showValidation])

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'inherit';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);


    return (
        <label className="w-full">
            {label && <div className="text-pale-foreground text-sm ml-1 w-full">{label}</div>}
            <textarea
                ref={textareaRef}
                onInput={handleInput}
                rows={1}
                className={`${className} px-4 py-2 outline-none resize-none rounded-lg flex items-center bg-primary border w-full min-h-[40px] ${statusClasses}`}
                value={value}
                onKeyDown={handleKeyDown}
                {...props}
            />
            {showValidation && (
                <div className={`text-sm ${validateResult === "выглядит хорошо!" ? "text-safe-foreground/80" : "text-danger-foreground/80"}`}>
                    {validateResult}
                </div>
            )}
        </label>
    );
}

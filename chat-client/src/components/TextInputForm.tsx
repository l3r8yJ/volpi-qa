import {FC, useEffect, useRef} from 'react';
import {PaperAirplaneIcon} from "@heroicons/react/24/solid";

export const TextInputForm: FC = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        handleTextareaInput()
    }, [])

    const handleTextareaInput = () => {
        const textarea = textareaRef.current;
        if(textarea){
            textarea.style.height = "10px"; // Сбросим высоту до автоматической
            textarea.style.height = `${textarea.scrollHeight}px`; // Установим высоту равную высоте содержимого
        }
    };

    return (
        <form className={"sticky bottom-0 py-4 px-2 border-t bg-zinc-50"}>
            <div className={"border w-full rounded-lg flex space-x-4 items-end p-2 shadow-lg shadow-zinc-500/20 bg-white"}>
                <textarea
                    ref={textareaRef}
                    className={"w-full outline-none px-2 max-h-[150px] resize-none flex items-center"}
                    placeholder={"Напишите что-нибудь..."}
                    onInput={handleTextareaInput}
                />
                <button>
                    <PaperAirplaneIcon
                        className={"w-6 h-6 cursor-pointer text-blue-400 hover:text-blue-600 duration-200 "}/>
                </button>
            </div>
        </form>
    );
}

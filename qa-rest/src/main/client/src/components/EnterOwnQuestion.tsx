import {FC, FormEvent, useEffect, useRef, useState} from "react"
import {CheckBadgeIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {setIsSentQuestion, toggleForm} from "../store/reducers/ownQuestionSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {Input} from "./UI/Input";
import {z} from "zod";
import {Email} from "../types/Email";
import {Question} from "../types/Question";

type EnterOwnQuestionProps = {
    defaultQuestion: string
}

const EnterOwnQuestion: FC<EnterOwnQuestionProps> = ({defaultQuestion}) => {
    const {isQuestionSent} = useAppSelector(state => state.ownQuestion)
    const [questionText, setQuestionText] = useState(defaultQuestion)
    const [email, setEmail] = useState("")
    const [questionError, setQuestionError] = useState<string | null>(null)
    const [emailError, setEmailError] = useState<string | null>(null)
    const dispatch = useAppDispatch();
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const formHandler = (e: FormEvent) => {
        e.preventDefault();
        let localEmailError = null;
        let localQuestionError = null;

        try {
            Email.parse(email);
        } catch (err: any) {
            if(err instanceof z.ZodError)
                localEmailError = err.errors[0].message;
            else console.log(err)
        }

        try {
            Question.parse(questionText)
        } catch (err: any) {
            if(err instanceof z.ZodError)
                localQuestionError = err.errors[0].message;
            else console.log(err)
        }

        setEmailError(localEmailError);
        setQuestionError(localQuestionError);

        if (localEmailError || localQuestionError)
            return
        dispatch(setIsSentQuestion(true));
    }

    const closeForm = () => {
        dispatch(setIsSentQuestion(false));
        dispatch(toggleForm());
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            closeForm();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            className={`absolute z-10 bottom-24 left-1/2 transform -translate-x-1/2 w-full px-2`}
        >
            {isQuestionSent
                ? <form
                    className={"flex flex-col shadow-lg shadow-neutral-500/50 p-4 rounded-lg gap-y-2 bg-white"}
                    onReset={closeForm}
                >
                    <div className={"flex gap-x-2 items-center"}>
                        <h2
                            className={"text-lg font-semibold"}
                        >
                            Вопрос успешно отправлен!
                        </h2>
                        <div className={"bg-green-100 p-0.5 rounded-full"}>
                            <CheckBadgeIcon className={"text-green-600 w-5 h-5"}/>
                        </div>
                    </div>
                    <div className={"text-sm text-neutral-500"}>
                        Вам придёт уведомление на почту, когда Ваш запрос будет обработан
                    </div>
                    <div className={"flex justify-end"}>
                        <button
                            type={"reset"}
                            className={"bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 duration-150"}
                        >
                            Окей
                        </button>
                    </div>
                </form>
                : <form
                    className={"flex flex-col bg-white gap-y-8 w-full p-4 rounded-lg shadow-lg shadow-neutral-500/50 relative"}
                    onSubmit={formHandler}
                >
                    <button
                        className={"absolute top-4 right-4  hover:text-neutral-500 duration-150"}
                        onClick={closeForm}
                        type={"reset"}
                    >
                        <XMarkIcon className={"w-5 h-5"}/>
                    </button>
                    <h2 className={"text-lg font-semibold text-center"}>Задайте свой вопрос</h2>
                    <div className={"flex flex-col gap-y-4"}>
                        <Input
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            label={"Вопрос"}
                            type={"text"}
                            error={questionError}
                        />
                        <Input
                            label={"Email"}
                            type={"email"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={emailError}
                        />
                    </div>
                    <button
                        className={"bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"}
                        type={"submit"}
                    >
                        Отправить вопрос
                    </button>
                </form>
            }
        </div>
    )
};

export default EnterOwnQuestion
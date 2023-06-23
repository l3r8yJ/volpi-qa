import {FC, FormEvent, useEffect, useState} from "react"
import {CheckBadgeIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {setIsSentQuestion, toggleForm} from "../store/reducers/ownQuestionSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux";

type EnterOwnQuestionProps = {
    defaultQuestion: string
}

const EnterOwnQuestion: FC<EnterOwnQuestionProps> = ({defaultQuestion}) => {
    const {isQuestionSent} = useAppSelector(state => state.ownQuestion)
    const [questionText, setQuestionText] = useState(defaultQuestion)
    const dispatch = useAppDispatch()
    const formHandler = (e: FormEvent) => {
        e.preventDefault()
        dispatch(setIsSentQuestion(true))
    }

    const closeForm = () => {
        dispatch(setIsSentQuestion(false))
        dispatch(toggleForm())
    }

    return (
        <div
            className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full px-2 bg-white`}
        >
            {isQuestionSent
                ? <div className={"flex flex-col shadow-lg shadow-neutral-500/50 border p-4 rounded-lg gap-y-2"}>
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
                            onClick={closeForm}
                            className={"bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 duration-150"}
                        >
                            Окей
                        </button>
                    </div>
                </div>
                : <form
                    className={"flex flex-col gap-y-8 w-full p-4 rounded-lg shadow-lg shadow-neutral-500/50 border relative"}
                    onSubmit={formHandler}
                >
                    <button
                        className={"absolute top-4 right-4  hover:text-neutral-500 duration-150"}
                        onClick={closeForm}
                    >
                        <XMarkIcon className={"w-5 h-5"}/>
                    </button>
                    <h2 className={"text-lg font-semibold text-center"}>Задайте свой вопрос</h2>
                    <div className={"flex flex-col gap-y-4"}>
                        <input
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            className={"border px-4 py-2 rounded-lg"}
                        />
                        <input className={"border px-4 py-2 rounded-lg"}/>
                    </div>
                    <button
                        className={"bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"}
                        onClick={() => dispatch(setIsSentQuestion(true))}
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
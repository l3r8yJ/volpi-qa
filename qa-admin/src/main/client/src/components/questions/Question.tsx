import {FC, useState} from 'react';
import {IQuestion, IQuestionNoID} from "../../types/IQuestion";
import {PencilSquareIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {deleteQuestion, fetchQuestionsByCategory, updateQuestion} from "../../store/actions/questionAction";
import {Input} from "../UI/Input/Input";
import {PrimaryButton} from "../UI/PrimaryButton/PrimaryButton";

interface QuestionProps {
    question: IQuestion
}

export const Question: FC<QuestionProps> = ({question}) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [text, setText] = useState(question.text)
    const [answer, setAnswer] = useState(question.answer)
    const dispatch = useAppDispatch()
    const {currentCategory} = useAppSelector(state => state.category)
    const deleteHandler = async () => {
        await dispatch(deleteQuestion(question.id))
        dispatch(fetchQuestionsByCategory(currentCategory.name))
    }
    const cancelHandler = () => {
        setIsEditMode(false)
    }
    const updateHandler = async () => {
        const newQuestion:IQuestion = {
            id: question.id,
            text,
            answer,
            category: currentCategory
        }
        await dispatch(updateQuestion(newQuestion))
        await dispatch(fetchQuestionsByCategory(currentCategory.name))
        setIsEditMode(false)
    }
    return (
        <div className={"p-4 bg-neutral-800 rounded-lg flex space-x-6"}>
            {isEditMode
                ? <div >
                    <div className={"flex flex-col space-y-2"}>
                        <Input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            label={"Вопрос"}
                        />
                        <Input
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            label={"Ответ"}
                        />
                    </div>
                    <div className={"flex space-x-2 mt-4"}>
                        <PrimaryButton
                            className={"bg-green-700 hover:bg-green-600"}
                            onClick={updateHandler}
                        >
                            Сохранить
                        </PrimaryButton>
                        <PrimaryButton
                            className={"bg-red-700 hover:bg-red-600"}
                            onClick={cancelHandler}
                        >
                            Отменить
                        </PrimaryButton>
                    </div>
                </div>
                : <>
                    <div>
                        <div className={"text-xl"}>{question.text}</div>
                        <div className={"text-neutral-400"}>{question.answer}</div>
                    </div>
                    <div className={"flex items-start space-x-2"}>
                        <PencilSquareIcon
                            className={"w-7 h-7 cursor-pointer hover:bg-neutral-700 p-1 rounded-full duration-150"}
                            onClick={() => setIsEditMode(true)}
                        />
                        <XMarkIcon
                            className={"w-7 h-7 cursor-pointer hover:bg-neutral-700 p-1 rounded-full duration-150"}
                            onClick={deleteHandler}
                        />
                    </div>
                </>
            }

        </div>
    );
}

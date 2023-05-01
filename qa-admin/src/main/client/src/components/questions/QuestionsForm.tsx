import {FC, FormEvent, useEffect, useState} from 'react';
import {Input} from "../UI/Input/Input";
import {PrimaryButton} from "../UI/PrimaryButton/PrimaryButton";
import {PlusIcon} from "@heroicons/react/24/outline";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {createQuestion, fetchQuestionsByCategory} from "../../store/actions/questionAction";
import {IQuestionNoID} from "../../types/IQuestion";
import {fetchCategoryByName} from "../../store/actions/categoryAction";
import {validateInputValue} from "../../utils/validateInputValue/validateInputValue";

interface QuestionsFormProps {
    categoryName: string
}

export const QuestionsForm: FC<QuestionsFormProps> = ({categoryName}) => {
    const [text, setText] = useState("")
    const [answer, setAnswer] = useState("")
    const [textValid, setTextValid] = useState("")
    const [answerValid, setAnswerValid] = useState("")
    const [showValidation, setShowValidation] = useState(false)
    const dispatch = useAppDispatch()
    const {currentCategory} = useAppSelector(state => state.category)
    useEffect(() => {
        dispatch(fetchCategoryByName(categoryName))
    }, [])

    useEffect(() => {
        setTextValid(validateInputValue(text))
    }, [text])

    useEffect(() => {
        setAnswerValid(validateInputValue(answer))
    }, [answer])

    const formHandler = async (e: FormEvent) => {
        e.preventDefault()
        if (textValid !== "выглядит хорошо!" || answerValid !== "выглядит хорошо!") return setShowValidation(true)
        const newQuestion: IQuestionNoID = {
            answer,
            text,
            category: {
                id: currentCategory.id,
                name: currentCategory.name
            },
        }
        await dispatch(createQuestion(newQuestion))
        dispatch(fetchQuestionsByCategory(categoryName))
        setShowValidation(false)
        setText("")
        setAnswer("")
    }
    return (
        <form className={"flex flex-col space-y-4"} onSubmit={formHandler}>
            <Input
                label={"Вопрос"}
                value={text}
                onChange={(e) => setText(e.target.value)}
                validateResult={showValidation? textValid : ""}
            />
            <Input
                label={"Ответ"}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                validateResult={showValidation ? answerValid : ""}
            />
            <PrimaryButton className={"flex justify-center items-center space-x-1"}>
                <PlusIcon className={"w-5 h-5"}/>
                <span>Создать</span>
            </PrimaryButton>
        </form>
    );
}

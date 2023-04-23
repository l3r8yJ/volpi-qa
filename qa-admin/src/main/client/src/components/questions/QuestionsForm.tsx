import {FC, FormEvent, useEffect, useState} from 'react';
import {Input} from "../UI/Input";
import {PrimaryButton} from "../UI/PrimaryButton";
import {PlusIcon} from "@heroicons/react/24/outline";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {createQuestion, fetchQuestionsByCategory} from "../../store/actions/questionAction";
import {IQuestionNoID} from "../../types/IQuestion";
import {fetchCategoryByName} from "../../store/actions/categoryAction";

interface QuestionsFormProps {
    categoryName: string
}

export const QuestionsForm: FC<QuestionsFormProps> = ({categoryName}) => {
    const [text, setText] = useState("")
    const [answer, setAnswer] = useState("")
    const dispatch = useAppDispatch()
    const {currentCategory} = useAppSelector(state => state.category)
    useEffect(() => {
        dispatch(fetchCategoryByName(categoryName))
    }, [])

    const formHandler = async (e: FormEvent) => {
        e.preventDefault()
        if(!text || !answer) return
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
        setText("")
        setAnswer("")
    }
    return (
        <form className={"flex flex-col space-y-4"} onSubmit={formHandler}>
            <Input label={"Вопрос"} value={text} onChange={(e) => setText(e.target.value)}/>
            <Input label={"Ответ"} value={answer} onChange={(e) => setAnswer(e.target.value)}/>
            <PrimaryButton className={"flex justify-center items-center space-x-1"}>
                <PlusIcon className={"w-5 h-5"}/>
                <span>Создать</span>
            </PrimaryButton>
        </form>
    );
}

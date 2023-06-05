import {FC, FormEvent, useEffect, useState} from 'react';
import {ValidatedInput} from "../UI/ValidatedInput/ValidatedInput";
import {PrimaryButton} from "../UI/PrimaryButton/PrimaryButton";
import {PlusIcon} from "@heroicons/react/24/outline";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {createQuestion, fetchQuestionsByCategory} from "../../store/actions/questionAction";
import {IQuestionNoID} from "../../types/IQuestion";
import {fetchCategoryByName} from "../../store/actions/categoryAction";
import {createValidateInputValueFunc} from "../../utils/createValidateInputValue/createValidateInputValueFunc";

interface QuestionsFormProps {
    categoryName: string
}

const validateInputValue = createValidateInputValueFunc()

export const QuestionsForm: FC<QuestionsFormProps> = ({categoryName}) => {
    const [text, setText] = useState("")
    const [answer, setAnswer] = useState("")
    const [textValid, setTextValid] = useState(false)
    const [answerValid, setAnswerValid] = useState(false)
    const [showValidation, setShowValidation] = useState(false)
    const dispatch = useAppDispatch()
    const {currentCategory} = useAppSelector(state => state.category)
    useEffect(() => {
        dispatch(fetchCategoryByName(categoryName))
    }, [])

    const formHandler = async (e: FormEvent) => {
        e.preventDefault()
        if (!textValid || !answerValid) return setShowValidation(true)
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
            <ValidatedInput
                label={"Вопрос"}
                value={text}
                onChange={(e) => setText(e.target.value)}
                setIsValid={setTextValid}
                validateFunc={validateInputValue}
                showValidation={showValidation}
            />
            <ValidatedInput
                label={"Ответ"}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                setIsValid={setAnswerValid}
                validateFunc={validateInputValue}
                showValidation={showValidation}
            />
            <PrimaryButton className={"flex justify-center items-center space-x-1"} type={"submit"}>
                <PlusIcon className={"w-5 h-5"}/>
                <span>Новый вопрос</span>
            </PrimaryButton>
        </form>
    );
}

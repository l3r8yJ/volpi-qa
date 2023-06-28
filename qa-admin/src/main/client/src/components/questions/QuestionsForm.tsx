import {FC, FormEvent, useCallback, useEffect, useState} from 'react';
import {ValidatedInput} from "../UI/ValidatedInput/ValidatedInput";
import {PrimaryButton} from "../UI/PrimaryButton/PrimaryButton";
import {PlusIcon} from "@heroicons/react/20/solid";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {createQuestion, fetchQuestionsByCategory} from "../../store/actions/questionAction";
import {IQuestionNoID} from "../../types/IQuestion";
import {fetchCategoryByName} from "../../store/actions/categoryAction";
import {createValidateInputValueFunc} from "../../utils/createValidateInputValue/createValidateInputValueFunc";
import {Modal} from "../UI/Modal";
import {ValidatedTextArea} from "../UI/ValidatedTextArea";

interface QuestionsFormProps {
    categoryName: string
}


export const QuestionsForm: FC<QuestionsFormProps> = ({categoryName}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [text, setText] = useState("")
    const [answer, setAnswer] = useState("")
    const [isTextValid, setIsTextValid] = useState(false)
    const [isAnswerValid, setIsAnswerValid] = useState(false)
    const [showValidation, setShowValidation] = useState(false)
    const dispatch = useAppDispatch()
    const {currentCategory} = useAppSelector(state => state.category)
    const {questions} = useAppSelector(state => state.question)
    const validateText = useCallback(
        () =>
            currentCategory && createValidateInputValueFunc({
                banWords: questions?.map((question) => question.text.trim()),
            }),
        [questions]
    )();
    const validateAnswer = useCallback(
        () =>
            currentCategory && createValidateInputValueFunc({
                banWords: questions?.map((question) => question.answer.trim()),
            }),
        [questions]
    )();
    useEffect(() => {
        dispatch(fetchCategoryByName(categoryName))
    }, [])

    const formHandler = async (e: FormEvent) => {
        e.preventDefault()
        if (!isTextValid || !isAnswerValid) return setShowValidation(true)
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
        <Modal
            title={"Создание вопроса"}
            buttonText={"Новый вопрос"}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
        >
            <form className={"flex flex-col gap-y-4"} onSubmit={formHandler}>
                <ValidatedTextArea
                    label={"Вопрос"}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    setIsValid={setIsTextValid}
                    isValid={isTextValid}
                    validateFunc={validateText}
                    showValidation={showValidation}
                    className={"max-h-64 min-h-[45px]"}
                />
                <ValidatedTextArea
                    label={"Ответ"}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    setIsValid={setIsAnswerValid}
                    isValid={isAnswerValid}
                    validateFunc={validateAnswer}
                    showValidation={showValidation}
                    className={"max-h-64 min-h-[45px]"}
                />
                <div className={"flex justify-end w-full mt-2"}>
                    <PrimaryButton className={"flex justify-center items-center space-x-1 w-auto min-w-[200px]"} type={"submit"}>
                        <PlusIcon className={"w-5 h-5"}/>
                        <span>Новый вопрос</span>
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}

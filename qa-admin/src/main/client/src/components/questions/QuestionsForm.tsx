import React, {FC, FormEvent, useCallback, useEffect, useState} from 'react';
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
import {Loader} from "../UI/Loader";
import {LoaderSize} from "../../utils/getLoaderSizeByName";

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
    const {questions, loading} = useAppSelector(state => state.question)
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
        setIsModalOpen(false)
        dispatch(fetchQuestionsByCategory(categoryName))
        setShowValidation(false)
        setText("")
        setAnswer("")
    }
    return (
        <div className={"min-w-[200px]"}>
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
                    <div className={"w-full flex justify-end mt-2"}>
                        <div className={"text-pale-foreground flex items-end text-xs mr-2"}>Отправить: Ctrl + Enter
                        </div>
                        <PrimaryButton
                            className={`min-w-[200px] ${loading === "pending" ? "cursor-not-allowed" : ""}`}
                            type={"submit"}
                            disabled={loading === "pending"}
                        >
                            {loading === "pending"
                                ? <Loader size={LoaderSize.small}/>
                                : <div className={"flex items-center justify-center gap-x-1"}>
                                    <PlusIcon className={"w-5 h-5"}/>
                                    <span>Создать вопрос</span>
                                </div>
                            }
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

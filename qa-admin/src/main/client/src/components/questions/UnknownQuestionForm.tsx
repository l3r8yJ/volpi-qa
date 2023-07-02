import React, {FC, FormEvent, useCallback, useEffect, useState} from "react"
import {Modal} from "../UI/Modal";
import {ValidatedTextArea} from "../UI/ValidatedTextArea";
import {createValidateInputValueFunc} from "../../utils/createValidateInputValue/createValidateInputValueFunc";
import {PrimaryButton} from "../UI/PrimaryButton/PrimaryButton";
import {Loader} from "../UI/Loader";
import {LoaderSize} from "../../utils/getLoaderSizeByName";
import {PlusIcon} from "@heroicons/react/20/solid";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchCategories} from "../../store/actions/categoryAction";
import {AnsweredUnknownQuestion} from "../../types/IQuestion";
import {answerUnknownQuestion, fetchUnknownQuestions} from "../../store/actions/questionAction";

interface UnknownQuestionFormProps {
    defaultQuestionText: string
    questionId: number
}

export const UnknownQuestionForm: FC<UnknownQuestionFormProps> = ({defaultQuestionText, questionId}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [text, setText] = useState(defaultQuestionText)
    const [answer, setAnswer] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("Выберите категорию")
    const [isTextValid, setIsTextValid] = useState(false)
    const [isAnswerValid, setIsAnswerValid] = useState(false)
    const [showValidation, setShowValidation] = useState(false)
    const dispatch = useAppDispatch()
    const {categories} = useAppSelector(state => state.category)
    const {currentCategory} = useAppSelector(state => state.category)
    const {questions, loading} = useAppSelector(state => state.question)
    const validateText = useCallback(
        () =>
            createValidateInputValueFunc({
                banWords: questions?.map((question) => question.text.trim()),
            }),
        [questions]
    )();
    const validateAnswer = useCallback(
        () =>
            createValidateInputValueFunc({
                banWords: questions?.map((question) => question.answer.trim()),
            }),
        [questions]
    )();
    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    const formHandler = async (e: FormEvent) => {
        e.preventDefault()
        if (!isTextValid || !isAnswerValid || selectedCategory === "Выберите категорию") return setShowValidation(true)
        const answeredQuestion: AnsweredUnknownQuestion = {
            category: selectedCategory,
            text,
            answer,
            unknownQuestionId: questionId
        }
        await dispatch(answerUnknownQuestion(answeredQuestion))
        setIsModalOpen(false)
        dispatch(fetchUnknownQuestions())
        setShowValidation(false)
        setText("")
        setAnswer("")
        setSelectedCategory("Выберите категорию")
    }
    return (
        <Modal
            buttonText={"Ответить"}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            title={"Добавление ответа на вопрос"}
            description={"После ответа на вопрос он автоматически удалится из этого списка и появится в общем списке вопросов"}
        >
            <form
                className={"flex flex-col gap-y-4"}
                onSubmit={formHandler}
            >

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
                <label>
                    <div className={"ml-1 text-pale-foreground text-sm"}>Категория</div>
                    <div className={`w-full px-1 rounded-lg border ${showValidation && selectedCategory === "Выберите категорию" ? "border-danger/50" : "border-border/50"} bg-primary`}>
                        <select
                            className={"w-full outline-none p-2 bg-primary"}
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            required
                        >
                            <option value={"Выберите категорию"} disabled>Выберите категорию</option>
                            {categories.map((category) => (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                )
                            )}
                        </select>
                    </div>
                    {selectedCategory === "Выберите категорию" && showValidation &&
                        <div className={"text-danger-foreground text-sm"}>Необходимо выбрать категорию</div>
                    }
                </label>
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
                                <span>Добавить ответ</span>
                            </div>
                        }
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
};
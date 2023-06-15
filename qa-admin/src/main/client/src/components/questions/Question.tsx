import {FC, useState} from 'react';
import {IQuestion} from "../../types/IQuestion";
import {PencilSquareIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {deleteQuestion, fetchQuestionsByCategory, updateQuestion} from "../../store/actions/questionAction";
import {ValidatedInput} from "../UI/ValidatedInput/ValidatedInput";
import {PrimaryButton} from "../UI/PrimaryButton/PrimaryButton";
import {Popup} from "../UI/Popup";
import {createValidateInputValueFunc} from "../../utils/createValidateInputValue/createValidateInputValueFunc";
import {ValidatedTextarea} from "../UI/ValidatedTextarea";
import {CheckIcon, NoSymbolIcon} from "@heroicons/react/20/solid";

interface QuestionProps {
    question: IQuestion
}

const validateInputValue = createValidateInputValueFunc()

export const Question: FC<QuestionProps> = ({question}) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [text, setText] = useState(question.text)
    const [answer, setAnswer] = useState(question.answer)
    const [showValidation, setShowValidation] = useState(false)
    const [isTextValid, setIsTextValid] = useState(false)
    const [isAnswerValid, setIsAnswerValid] = useState(false)
    const dispatch = useAppDispatch()
    const {currentCategory} = useAppSelector(state => state.category)
    const deleteHandler = async () => {
        await dispatch(deleteQuestion(question.id))
        dispatch(fetchQuestionsByCategory(currentCategory.name))
    }
    const cancelHandler = () => {
        setIsEditMode(false)
        setText(question.text)
        setAnswer(question.answer)
    }
    const updateHandler = async () => {
        if (!isTextValid || !isAnswerValid) {
            return setShowValidation(true)
        }
        const newQuestion: IQuestion = {
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

        <div className={"p-4 bg-border/10 rounded-lg flex space-x-6 justify-between w-full"}>
            {isEditMode
                ? <div className={"w-full"}>
                    <div className={"flex flex-col space-y-2 w-full"}>
                        <ValidatedInput
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            label={"Вопрос"}
                            validateFunc={validateInputValue}
                            setIsValid={setIsTextValid}
                            showValidation={showValidation}
                        />
                        <ValidatedTextarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            label={"Ответ"}
                            validateFunc={validateInputValue}
                            setIsValid={setIsAnswerValid}
                            showValidation={showValidation}
                            className={"max-h-40"}
                        />
                    </div>
                    <div className={"flex space-x-2 mt-4 justify-end"}>
                        <div className={"flex gap-2"}>
                            <PrimaryButton
                                className={"bg-safe hover:bg-safeHov flex gap-1 items-center"}
                                onClick={updateHandler}
                            >
                                <CheckIcon className={"w-5 h-5"}/>
                                <span>Сохранить</span>
                            </PrimaryButton>
                            <PrimaryButton
                                className={"flex items-center gap-1"}
                                onClick={cancelHandler}
                            >
                                <NoSymbolIcon className={"w-5 h-5"}/>
                                <span>Отменить</span>
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
                : <>
                    <div>
                        <div className={"text-xl break-words"}>{question.text}</div>
                        <div className={"text-pale break-words"}>{question.answer}</div>
                    </div>
                    <div className={"flex items-start space-x-2"}>
                        <div
                            className={"cursor-pointer hover:bg-pale/20 p-1 rounded-full duration-150"}
                            onClick={() => setIsEditMode(true)}
                        >
                            <PencilSquareIcon
                                className={"w-5 h-5"}
                            />
                        </div>
                        <Popup
                            ButtonElement={
                                <div className={"cursor-pointer hover:bg-pale/20 p-1 rounded-full duration-150"}>
                                    <XMarkIcon
                                        className={"w-5 h-5"}/>
                                </div>
                            }
                            optionButtons={[
                                <PrimaryButton
                                    className={"bg-danger hover:bg-dangerHov flex gap-1 items-center"}
                                    onClick={deleteHandler}
                                >
                                    <XMarkIcon className={"w-5 h-5"}/>
                                    <span>Удалить</span>
                                </PrimaryButton>,
                                <PrimaryButton
                                    className={"flex items-center gap-1"}
                                    onClick={cancelHandler}
                                >
                                    <NoSymbolIcon className={"w-5 h-5"}/>
                                    <span>Отменить</span>
                                </PrimaryButton>
                            ]}
                            title={"Уверены, что хотите удалить вопрос?"}
                        >
                        </Popup>
                    </div>
                </>
            }
        </div>
    );
}

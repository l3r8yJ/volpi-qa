import {FC} from "react"
import {UnknownQuestion as UnknownQuestionType} from "../../types/IQuestion";
import {SecondaryButton} from "../UI/SecondaryButton";
import {UnknownQuestionForm} from "./UnknownQuestionForm";
import {Popup} from "../UI/Popup";
import {PrimaryButton} from "../UI/PrimaryButton/PrimaryButton";
import {NoSymbolIcon} from "@heroicons/react/20/solid";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {useAppDispatch} from "../../hooks/redux";
import {deleteUnknownQuestion, fetchUnknownQuestions} from "../../store/actions/questionAction";

interface UnknownQuestionProps {
    question: UnknownQuestionType
}

export const UnknownQuestion: FC<UnknownQuestionProps> = ({question}) => {
    const dispatch = useAppDispatch()
    const deleteHandler = async () => {
        await dispatch(deleteUnknownQuestion(question.id))
        dispatch(fetchUnknownQuestions())
    }
    return (
        <div className={"flex flex-col p-4 gap-y-4 items-start"}>
            <div className={"break-words"}>{question.text}</div>
            <div className={"flex gap-x-2"}>
                <UnknownQuestionForm defaultQuestionText={question.text} questionId={question.id}/>
                <Popup
                    ButtonElement={
                        <SecondaryButton variant={"danger"} className={"w-auto"}>Удалить</SecondaryButton>
                    }
                    position={"right"}
                    optionButtons={[
                        <PrimaryButton
                            className={"flex items-center justify-center gap-x-1"}
                            variant={"safe"}
                        >
                            <NoSymbolIcon className={"w-5 h-5"}/>
                            <span>Отменить</span>
                        </PrimaryButton>,
                        <SecondaryButton
                            className={"flex items-center justify-center gap-x-1 w-full"}
                            variant={"danger"}
                            onClick={deleteHandler}
                        >
                            <XMarkIcon className={"w-5 h-5"}/>
                            <span>Удалить</span>
                        </SecondaryButton>]
                    }
                    title={"Вы действительно хотите удалить вопрос?"}
                />
            </div>
        </div>
    );
};
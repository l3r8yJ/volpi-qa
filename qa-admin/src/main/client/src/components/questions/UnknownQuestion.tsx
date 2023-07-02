import {FC} from "react"
import {UnknownQuestion as UnknownQuestionType} from "../../types/IQuestion";
import {SecondaryButton} from "../UI/SecondaryButton";
import {UnknownQuestionForm} from "./UnknownQuestionForm";

interface UnknownQuestionProps {
    question: UnknownQuestionType
}

export const UnknownQuestion: FC<UnknownQuestionProps> = ({question}) => {
    return (
        <div className={"flex flex-col p-4 gap-y-4 items-start"}>
            <div>{question.text}</div>
            <div className={"flex gap-x-2"}>
                <UnknownQuestionForm defaultQuestionText={question.text} questionId={question.id}/>
                <SecondaryButton variant={"danger"} className={"w-auto"}>Удалить</SecondaryButton>
            </div>
        </div>
    );
};
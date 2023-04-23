import {FC} from 'react';
import {Question} from "./Question";
import {IQuestion} from "../../types/IQuestion";

interface QuestionsListProps {
    questions: IQuestion[]
}

export const QuestionsList: FC<QuestionsListProps> = ({questions}) => {
    return (
        <div className={"flex flex-col items-start space-y-4 mt-4"}>
            {questions.map(question => (
                <Question question={question} key={question.id}/>
            ))}
        </div>
    );
}

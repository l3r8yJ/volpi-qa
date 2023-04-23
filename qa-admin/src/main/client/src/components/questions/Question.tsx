import {FC} from 'react';
import {IQuestion} from "../../types/IQuestion";

interface QuestionProps {
    question: IQuestion
}

export const Question: FC<QuestionProps> = ({question}) => {
    return (
        <div>
            <div>Вопрос: {question.text}</div>
            <div>Ответ: {question.answer}</div>
        </div>
    );
}

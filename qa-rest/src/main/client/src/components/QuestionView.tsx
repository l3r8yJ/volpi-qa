import {FC} from "react"
import {useAppSelector} from "../hooks/redux";

export const QuestionView: FC = () => {
    const {currentQuestion, currentViewName} = useAppSelector(state => state.view)
    if (currentQuestion === null || currentViewName !== "question") {
        return <div>Произошла ошибка при получении вопроса</div>
    }
    return (
        <div className={"flex flex-col"}>
            <div>Вопрос: {currentQuestion.text}</div>
            <div>Ответ: {currentQuestion?.answer}</div>
        </div>
    );
};
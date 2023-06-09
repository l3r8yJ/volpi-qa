import {FC} from "react"
import {useAppSelector} from "../../hooks/redux";

export const QuestionView: FC = () => {
    const {currentQuestion, currentViewName} = useAppSelector(state => state.view)
    if (currentQuestion === null || currentViewName !== "question") {
        return <div>Произошла ошибка при получении вопроса</div>
    }
    return (
        <div className={"flex flex-col"}>
            <h2 className={"font-semibold text-xl break-words"}>{currentQuestion.text}</h2>
            <div className={"w-full p-2 rounded-lg bg-zinc-100 mt-2 break-words"}>{currentQuestion?.answer}</div>
        </div>
    );
};
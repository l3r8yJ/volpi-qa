import {FC} from "react"
import {useAppSelector} from "../../hooks/redux";
import {Question} from "../Question";

export const CategoryView: FC = () => {
    const {currentViewName, currentCategory} = useAppSelector(state => state.view)
    if (currentViewName !== "category" || currentCategory === null) return <div>Произошла ошибка при получении
        категории</div>
    return (
        <div className={"overflow-y-auto"}>
            {currentCategory.questions.length > 0
                ? <div className={"flex flex-col space-y-4"}>
                    {currentCategory.questions.map(question => (
                        <Question key={question.id} text={question.text} answer={question.answer}/>
                    ))}
                </div>
                : <div>Здесь пока нет вопросов 🧐</div>}
        </div>
    );
};
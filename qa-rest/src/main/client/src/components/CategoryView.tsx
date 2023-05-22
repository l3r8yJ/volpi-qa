import {FC} from "react"
import {useAppSelector} from "../hooks/redux";

export const CategoryView: FC = () => {
    const {currentCategory} = useAppSelector(state => state.view)
    if (currentCategory === null) return <div>Произошла ошибка при получении категории</div>
    return (
        <div>
            {currentCategory.questions.length > 0
                ? currentCategory.questions.map(question => (
                    <div key={question.id}>{question.text}</div>
                ))
                : <div>Здесь пока нет вопросов 🧐</div>}
        </div>
    );
};
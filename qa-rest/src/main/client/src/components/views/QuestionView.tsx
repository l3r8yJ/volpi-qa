import {FC} from "react"
import {useAppSelector} from "../../hooks/redux";
import {parseLinks} from "../../utils/parseLinks";

export const QuestionView: FC = () => {
    const {currentQuestion, currentViewName} = useAppSelector(state => state.view)
    if (currentQuestion === null || currentViewName !== "question") {
        return <div>Произошла ошибка при получении вопроса</div>
    }
    return (
        <div className={"flex flex-col p-4"}>
            <h2
                className={"font-semibold text-xl break-words"}
                dangerouslySetInnerHTML={{__html: parseLinks(currentQuestion?.text)}}
            ></h2>
            <div
                className={"w-full p-2 rounded-lg bg-zinc-100 mt-2 break-words"}
                dangerouslySetInnerHTML={{__html: parseLinks(currentQuestion?.answer)}}
            ></div>
        </div>
    );
};
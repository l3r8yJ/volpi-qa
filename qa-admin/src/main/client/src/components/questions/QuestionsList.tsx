import {FC} from 'react';
import {Question} from "./Question";
import {useAppSelector} from "../../hooks/redux";
import {Skeleton} from "../UI/Skeleton";


export const QuestionsList: FC = () => {
    const {questions, loading} = useAppSelector(state => state.question)
    if (loading === "pending") return (
        <div className={"space-y-4"}>
            <Skeleton className={"w-full h-28"}/>
            <Skeleton className={"w-full h-24"}/>
            <Skeleton className={"w-full h-16"}/>
            <Skeleton className={"w-full h-20"}/>
        </div>
    )
    return (
        <div className={"flex flex-col items-start space-y-4"}>
            {questions.length === 0
                ? <div>В этой категории пока нет вопросов</div>
                : questions.map(question => (
                    <Question question={question} key={question.id}/>
                ))}
        </div>
    );
}

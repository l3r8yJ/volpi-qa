import {FC} from 'react';
import {Question} from "./Question";
import {useAppSelector} from "../../hooks/redux";
import {Loader} from "../UI/Loader";
import {LoaderSize} from "../../utils/getLoaderSizeByName";


export const QuestionsList: FC = () => {
    const {questions, loading} = useAppSelector(state => state.question)
    if (loading === "pending") return <Loader size={LoaderSize.medium}/>
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

import {FC, useEffect} from 'react';
import {MainLayout} from "../components/layouts/MainLayout";
import {useParams} from "react-router-dom";
import {QuestionsList} from "../components/questions/QuestionsList";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchQuestionsByCategory} from "../store/actions/questionAction";
import {QuestionsForm} from "../components/questions/QuestionsForm";
import {Sidebar} from "../components/Sidebar";
import {clearCurrentCategory} from "../store/reducers/categorySlice";

const CategoryName: FC = () => {
    const {name} = useParams()
    const {questions, loading} = useAppSelector(state => state.question)
    const dispatch = useAppDispatch()
    if (!name)
        return (
            <MainLayout>
                <div>Ошибка: категория не найдена</div>
            </MainLayout>
        )
    useEffect(() => {
        dispatch(fetchQuestionsByCategory(name))
        return() => {
            dispatch(clearCurrentCategory())
        }
    }, [])
    return (
        <MainLayout>
            <div className={"text-3xl w-full border-b py-4"}>
                <span className={"opacity-60"}>Категория:</span> {name}
            </div>
            {loading === "pending"
                ? <div>Загрузка...</div>
                : <>
                    {questions.length !== 0
                        ? <div className={"mt-4"}>
                            <Sidebar><QuestionsForm categoryName={name}/></Sidebar>
                            <div className={"ml-64 xl:ml-72"}>
                            <QuestionsList questions={questions}/>
                            </div>
                        </div>
                        : <div className={"mt-4 space-y-4"}>
                            <div>В этой категории нет ещё ни одного вопроса</div>
                            <QuestionsForm categoryName={name}/>
                        </div>
                    }</>
            }


        </MainLayout>
    );
}

export default CategoryName

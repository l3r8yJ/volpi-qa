import {FC, useEffect} from "react"
import {MainLayout} from "../components/layouts/MainLayout";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchUnknownQuestions} from "../store/actions/questionAction";

export const UnknownQuestions:FC = () => {
    const {unknownQuestions} = useAppSelector(state => state.question)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchUnknownQuestions())
    })
    return (
        <MainLayout>
            {unknownQuestions.map(q => (
                <div key={q.id}>{q.text}</div>
            ))}
        </MainLayout>
    );
};
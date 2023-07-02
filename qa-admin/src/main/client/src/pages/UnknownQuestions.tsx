import {FC, useEffect} from "react"
import {MainLayout} from "../components/layouts/MainLayout";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchUnknownQuestions} from "../store/actions/questionAction";
import {UnknownQuestion} from "../components/questions/UnknownQuestion";

export const UnknownQuestions: FC = () => {
    const {unknownQuestions, loading} = useAppSelector(state => state.question)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchUnknownQuestions())
    }, [])

    return (
        <MainLayout>
            {unknownQuestions.length === 0 && loading === "succeeded"
                ? <div>Здесь пока нет вопросов</div>
                : <div className={"bg-primary p-4 rounded-lg divide-y divide-border/20"}>
                    {unknownQuestions.map(q => (
                        <UnknownQuestion key={q.id} question={q}/>
                    ))}
                </div>
            }

        </MainLayout>
    );
};
import {FC, useEffect} from "react"
import {CategoryOption} from "../CategoryOption";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchAllCategories} from "../../store/actions/categoryAction";
import {Loader} from "../UI/Loader";

export const DefaultView: FC = () => {
    const {categories, loading} = useAppSelector(state => state.category)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchAllCategories())
    }, [])
    if (loading === "pending" && categories.length === 0) return <Loader/>

    return (
        <>
            <div className={"pt-4 px-4"}>
                Здравствуйте! Я постараюсь вам помочь и найти ответы на вопросы связанные с поступлением в
                наш Политех. <br/> Выберите категорию вопроса, который вас интересует.
            </div>
            <div className={"font-semibold text-lg px-4 pt-4 pb-3 sticky border-b -top-1 bg-white/50 backdrop-blur-sm z-10"}>Категории:</div>
            <div className={"space-y-4 px-4 pt-4"}>
                {categories.map((category) => (
                    <CategoryOption key={category.id} category={category}/>
                ))}
            </div>
        </>
    )
        ;
};
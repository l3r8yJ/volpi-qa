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
            <div className={"mt-4 px-4"}>
                Здравствуйте! Я постараюсь вам помочь и найти ответы на вопросы связанные с поступлением в
                наш Политех. <br/> Выберите категорию вопроса, который вас интересует.
            </div>
            <div className={"font-semibold px-4 border-b sticky top-0 bg-white/50 backdrop-blur-sm py-4"}>Категории:</div>
            <div className={"space-y-4 px-4 pt-4"}>
                {categories.map((category) => (
                    <CategoryOption key={category.id} category={category}/>
                ))}
            </div>
        </>
    )
        ;
};
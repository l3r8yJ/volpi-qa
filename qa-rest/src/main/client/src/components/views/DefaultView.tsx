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
            <div>
                Здравствуйте! Я постараюсь вам помочь и найти ответы на вопросы связанные с поступлением в
                наш Политех. <br/> Выберите категорию вопроса, который вас интересует:
            </div>
            <div className={"space-y-4"}>
                {categories.map((category) => (
                    <CategoryOption key={category.id} category={category}/>
                ))}
            </div>
        </>
    )
        ;
};
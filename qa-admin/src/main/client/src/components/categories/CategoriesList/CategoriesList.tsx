import {FC, useEffect} from 'react';
import {CategoryRow} from "./CategoryRow/CategoryRow";
import {CategoriesListHead} from "./CategoriesListHead";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchCategories} from "../../store/actions/categoryAction";

export const CategoriesList: FC = () => {
    const {categories} = useAppSelector(state => state.category)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchCategories())
    }, [])
    return (
        <div className={"rounded-lg  w-full"}>
            <CategoriesListHead/>
            <ul className={""}>
                {categories.map(c => (
                    <CategoryRow key={c.id} id={c.id} name={c.name}/>
                ))}
            </ul>
        </div>
    );
}

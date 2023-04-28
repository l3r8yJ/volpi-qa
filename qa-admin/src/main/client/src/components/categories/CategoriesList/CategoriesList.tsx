import {FC, useEffect} from 'react';
import {CategoryRow} from "../CategoryRow/CategoryRow";
import {CategoriesListHead} from "../CategoriesListHead";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchCategories} from "../../../store/actions/categoryAction";

interface CategoriesListProps {
    testID?: string
}

export const CategoriesList: FC<CategoriesListProps> = ({testID}) => {
    const categoryRowTestID = process.env.NODE_ENV === 'test' ? "CategoryRow-testID" : undefined
    const {categories} = useAppSelector(state => state.category)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchCategories())
    }, [])
    return (
        <div className={"rounded-lg w-full"} data-testid={testID}>
            <CategoriesListHead/>
            <ul>
                {categories.map(c => (
                    <CategoryRow key={c.id} id={c.id} name={c.name} testID={categoryRowTestID}/>
                ))}
            </ul>
        </div>
    );
}

import {FC, useEffect} from 'react';
import {CategoryRow} from "../CategoryRow/CategoryRow";
import {CategoriesListHead} from "../CategoriesListHead";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchCategories} from "../../../store/actions/categoryAction";
import {Loader} from "../../UI/Loader";
import {LoaderSize} from "../../../utils/getLoaderSizeByName";

interface CategoriesListProps {
    testID?: string
}

export const CategoriesList: FC<CategoriesListProps> = ({testID}) => {
    const categoryRowTestID = process.env.NODE_ENV === 'test' ? "CategoryRow-testID" : undefined
    const {categories, loading} = useAppSelector(state => state.category)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchCategories())
    }, [])
    if(loading === "pending") return <Loader size={LoaderSize.medium}/>
    return (
        <div className={"rounded-lg w-full"} data-testid={testID}>
            <CategoriesListHead/>
            <ul>
                {categories.map((c, i) => (
                    <CategoryRow key={c.id} id={c.id} name={c.name} testID={categoryRowTestID} num={i + 1}/>
                ))}
            </ul>
        </div>
    );
}

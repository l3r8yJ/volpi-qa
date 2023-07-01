import {FC, useEffect} from 'react';
import {CategoryRow} from "../CategoryRow/CategoryRow";
import {CategoriesListHead} from "../CategoriesListHead";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchCategories} from "../../../store/actions/categoryAction";
import {Loader} from "../../UI/Loader";
import {LoaderSize} from "../../../utils/getLoaderSizeByName";
import {Skeleton} from "../../UI/Skeleton";

const CategoryRowSkeleton = ({width}: {width: string}) => {
    return (
        <div className={"space-x-6 rounded-lg odd:bg-secondary flex items-center px-4 h-[40px]"}>
            <Skeleton className={"w-6 h-4"}/>
            <Skeleton className={`${width} h-4`}/>
        </div>
    )
}

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
    if (loading === "pending") return <div className={""}>
        <CategoriesListHead/>
        <CategoryRowSkeleton width={"w-96"}/>
        <CategoryRowSkeleton width={"w-80"}/>
        <CategoryRowSkeleton width={"w-64"}/>
        <CategoryRowSkeleton width={"w-72"}/>
        <CategoryRowSkeleton width={"w-96"}/>
        <CategoryRowSkeleton width={"w-80"}/>
        <CategoryRowSkeleton width={"w-64"}/>
        <CategoryRowSkeleton width={"w-72"}/>
        <CategoryRowSkeleton width={"w-96"}/>
        <CategoryRowSkeleton width={"w-80"}/>
        <CategoryRowSkeleton width={"w-64"}/>
        <CategoryRowSkeleton width={"w-72"}/>
    </div>
    return (
        <div className={"rounded-lg w-full p-4 bg-primary"} data-testid={testID}>
            <CategoriesListHead/>
            <ul>
                {categories.map((c, i) => (
                    <CategoryRow key={c.id} id={c.id} name={c.name} testID={categoryRowTestID} num={i + 1}/>
                ))}
            </ul>
        </div>
    );
}

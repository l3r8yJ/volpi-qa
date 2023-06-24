import {FC} from 'react';
import {ICategory} from "../types/ICategory";
import {useAppDispatch} from "../hooks/redux";
import {setCurrentCategory, setCurrentView} from "../store/reducers/viewSlice";

interface CategoryProps {
    category: ICategory
}

export const CategoryOption: FC<CategoryProps> = ({category}) => {
    const dispatch = useAppDispatch()
    const chooseCategoryHandler = () => {
        dispatch(setCurrentView("category"))
        dispatch(setCurrentCategory(category))
    }
    return (
        <div
            onClick={chooseCategoryHandler}
            className={"p-4 rounded-lg cursor-pointer border border-neutral-300/50 hover:bg-zinc-100 hover:scale-105 duration-150 break-words shadow-md shadow-zinc-200"}
        >
            {category.name}
        </div>
    );
}

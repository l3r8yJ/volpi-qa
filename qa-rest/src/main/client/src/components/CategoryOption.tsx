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
            className={"p-4 bg-zinc-100 rounded-lg cursor-pointer hover:bg-zinc-200 duration-200"}
        >
            {category.name}
        </div>
    );
}

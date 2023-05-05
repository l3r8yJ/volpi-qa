import {FC} from 'react';
import {ICategory} from "../types/ICategory";

interface CategoryProps {
    category: ICategory
}

export const Category: FC<CategoryProps> = ({category}) => {
    return (
        <div className={"p-4 bg-zinc-100 rounded-lg cursor-pointer hover:bg-zinc-200 duration-200"}>
            {category.name}
        </div>
    );
}

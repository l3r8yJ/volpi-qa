import {FC} from "react"
import {useAppSelector} from "../hooks/redux";

export const CategoryView:FC = () => {
    const {currentCategory} = useAppSelector(state => state.view)
    return (
        <div>
            {currentCategory === null && <div>Произошла ошибка при получении категории</div>}
        </div>
    );
};
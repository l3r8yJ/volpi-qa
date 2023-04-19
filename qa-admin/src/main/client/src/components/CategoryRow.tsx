import {FC} from 'react';
import {ICategory} from "../types/ICategory";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {useAppDispatch} from "../hooks/redux";
import {deleteCategory, fetchCategories} from "../store/actions/categoryAction";
import {Link} from "react-router-dom";

export const CategoryRow: FC<ICategory> = ({id, questions, name}) => {
    const dispatch = useAppDispatch()
    const deleteBtnHandler = async () => {
        await dispatch(deleteCategory(id))
        dispatch(fetchCategories())
    }
    return (
        <li className={"even:bg-neutral-800 flex justify-between rounded-lg items-center hover:bg-indigo-800"}>
            <Link to={"/categories/" + name} className={"flex w-full p-2"}>
                <div className={"w-10 px-2 text-neutral-400"}>{id}</div>
                <div className={"px-2 flex justify-between w-full"}>
                    <div>{name}</div>
                </div>
            </Link>
            <div className={"flex space-x-2"}>
                <button
                    className={"px-2 hover:text-red-600 cursor-pointer duration-150"}
                    onClick={deleteBtnHandler}
                >
                    <XMarkIcon className={"w-6 h-6"}/>
                </button>
            </div>
        </li>
    );
}

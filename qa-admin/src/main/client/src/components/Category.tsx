import {FC} from 'react';
import {ICategory} from "../types/ICategory";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {useAppDispatch} from "../hooks/redux";
import {deleteCategory, fetchCategories} from "../store/actions/categoryAction";

export const Category: FC<ICategory> = ({id, questions, name}) => {
    const dispatch = useAppDispatch()
    const deleteBtnHandler = async () => {
        await dispatch(deleteCategory(id))
        dispatch(fetchCategories())
    }
    return (
        <li className={"even:bg-neutral-800 flex items-center p-2 hover:bg-indigo-800 rounded-lg"}>
            <div className={"w-10 px-2 text-neutral-400"}>{id}</div>
            <div className={"px-2 flex justify-between w-full"}>
                <div>{name}</div>
                <div className={"flex space-x-2"}>
                    <div
                        className={"px-2 hover:text-red-600 cursor-pointer duration-150"}
                        onClick={deleteBtnHandler}
                    >
                        <XMarkIcon className={"w-6 h-6  "}/>
                    </div>
                </div>
            </div>
        </li>
    );
}

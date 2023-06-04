import {FC} from 'react';
import {XMarkIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import {ICategoryNoQuestions} from "../../../types/ICategory";
import {useAppDispatch} from "../../../hooks/redux";
import {deleteCategory, fetchCategories} from "../../../store/actions/categoryAction";
import {Popup} from "../../UI/Popup";
import {PrimaryButton} from "../../UI/PrimaryButton/PrimaryButton";

interface CategoryRowProps extends ICategoryNoQuestions {
    testID?: string
}

export const CategoryRow: FC<CategoryRowProps> = ({id, name, testID}) => {
    const dispatch = useAppDispatch()
    const deleteBtnHandler = async () => {
        await dispatch(deleteCategory(id))
        dispatch(fetchCategories())
    }
    return (
        <li
            data-testid={testID}
            className={"even:bg-neutral-800 flex justify-between rounded-lg items-center hover:bg-indigo-800 px-4"}
        >
            <Link to={"/categories/" + name} className={"flex w-full py-2"}>
                <div className={"w-10 text-neutral-400"}>{id}</div>
                <div className={"pl-2"}>{name}</div>
            </Link>
            <Popup
                title={"Вы уверены, что хотите удалить категорию?"}
                ButtonElement={
                    <XMarkIcon className={"w-7 h-7 hover:bg-neutral-200/20 p-1 rounded-full duration-150"}/>
                }
                optionButtons={[
                    <button
                        className={"px-4 py-2 bg-red-700 duration-150 rounded-lg hover:bg-red-600"}
                        onClick={deleteBtnHandler}
                    >
                        Удалить
                    </button>,
                    <PrimaryButton>Не удалять</PrimaryButton>
                ]}
            >
            </Popup>
        </li>
    );
}

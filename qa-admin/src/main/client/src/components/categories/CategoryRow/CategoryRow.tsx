import {FC} from 'react';
import {XMarkIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import {ICategoryNoQuestions} from "../../../types/ICategory";
import {useAppDispatch} from "../../../hooks/redux";
import {deleteCategory, fetchCategories} from "../../../store/actions/categoryAction";
import {Popup} from "../../UI/Popup";
import {PrimaryButton} from "../../UI/PrimaryButton/PrimaryButton";
import {NoSymbolIcon} from "@heroicons/react/20/solid";

interface CategoryRowProps extends ICategoryNoQuestions {
    testID?: string
    num: number
}

export const CategoryRow: FC<CategoryRowProps> = ({id, name, testID, num}) => {
    const dispatch = useAppDispatch()
    const deleteBtnHandler = async () => {
        await dispatch(deleteCategory(id))
        dispatch(fetchCategories())
    }
    return (
        <li
            data-testid={testID}
            className={"even:bg-secondaryEven flex justify-between rounded-lg items-center hover:bg-primaryHov px-4"}
        >
            <Link to={"/categories/" + name} className={"flex w-full py-2"}>
                <div className={"w-10 text-pale"}>{num}</div>
                <div className={"pl-2 break-all flex-1"}>{name}</div>
            </Link>
            <Popup
                title={"Вы уверены, что хотите удалить категорию?"}
                ButtonElement={
                    <div className={"hover:bg-paleHov/20 p-1 rounded-full duration-150"}>
                        <XMarkIcon className={"w-5 h-5"}/>
                    </div>
                }
                optionButtons={[
                    <PrimaryButton
                        className={"bg-danger hover:bg-dangerHov flex items-center gap-1"}
                        onClick={deleteBtnHandler}
                    >
                        <XMarkIcon className={"w-5 h-5"}/>
                        <span>Удалить</span>
                    </PrimaryButton>,
                    <PrimaryButton className={"flex items-center gap-1"}>
                        <NoSymbolIcon className={"w-5 h-5"}/>
                        <span>Не удалять</span>
                    </PrimaryButton>
                ]}
            >
            </Popup>
        </li>
    );
}

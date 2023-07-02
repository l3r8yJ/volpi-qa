import {FC} from 'react';
import {XMarkIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import {ICategoryNoQuestions} from "../../../types/ICategory";
import {useAppDispatch} from "../../../hooks/redux";
import {deleteCategory, fetchCategories} from "../../../store/actions/categoryAction";
import {Popup} from "../../UI/Popup";
import {PrimaryButton} from "../../UI/PrimaryButton/PrimaryButton";
import {NoSymbolIcon} from "@heroicons/react/20/solid";
import {SecondaryButton} from "../../UI/SecondaryButton";

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
            className={"even:bg-secondary flex justify-between rounded-lg items-center hover:bg-accent hover:text-btn-foreground px-4 group"}
        >
            <Link to={"/categories/" + name} className={"flex w-full py-2"}>
                <div className={"w-10 text-pale-foreground group-hover:text-btn-foreground"}>{num}</div>
                <div className={"pl-2 break-words flex-1"}>{name}</div>
            </Link>
            <Popup
                title={"Вы уверены, что хотите удалить категорию?"}
                ButtonElement={
                    <button className={"hover:bg-pale/20 p-1 rounded-full"}>
                        <XMarkIcon className={"w-5 h-5"}/>
                    </button>
                }
                optionButtons={[
                    <PrimaryButton
                        className={"flex items-center justify-center gap-1"}
                        variant={"safe"}
                    >
                        <NoSymbolIcon className={"w-5 h-5"}/>
                        <span>Не удалять</span>
                    </PrimaryButton>,
                    <SecondaryButton
                        className={"flex items-center justify-center gap-1"}
                        variant={"danger"}
                        onClick={deleteBtnHandler}
                    >
                        <XMarkIcon className={"w-5 h-5"}/>
                        <span>Удалить</span>
                    </SecondaryButton>
                ]}
            >
            </Popup>
        </li>
    );
}

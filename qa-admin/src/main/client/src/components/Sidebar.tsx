import {FC, useState} from 'react';
import {PrimaryButton} from "./UI/PrimaryButton";
import {Input} from "./UI/Input";
import {useAppDispatch} from "../hooks/redux";
import {createCategory, fetchCategories} from "../store/actions/categoryAction";

export const Sidebar: FC = () => {
    const [inputValue, setInputValue] = useState("")
    const dispatch = useAppDispatch()
    const btnHandler = async () => {
        if(inputValue){
            await dispatch(createCategory(inputValue))
            dispatch(fetchCategories())
        }
    }
    return (
        <div className={"fixed flex flex-col w-60 h-96 bg-neutral-800 rounded-lg p-4"}>
            <div className={"space-y-2 flex flex-col items-center"}>
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={"Название категории"}
                />
                <PrimaryButton title={"Новая категория"} onClick={btnHandler}/>
            </div>
        </div>
    );
}

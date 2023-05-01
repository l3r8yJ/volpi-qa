import React, {FC, FormEvent, useState} from 'react';
import {useAppDispatch} from "../../hooks/redux";
import {createCategory, fetchCategories} from "../../store/actions/categoryAction";
import {Input} from "../UI/Input/Input";
import {PrimaryButton} from "../UI/PrimaryButton/PrimaryButton";

export const CategoriesForm: FC = () => {
    const [categoryName, setCategoryName] = useState("")
    const dispatch = useAppDispatch()
    const btnHandler = async (e:FormEvent) => {
        e.preventDefault()
        if(categoryName){
            await dispatch(createCategory(categoryName))
            dispatch(fetchCategories())
            setCategoryName("")
        }
    }
    return (
        <form className={"space-y-4 flex flex-col items-center"} onSubmit={btnHandler}>
            <Input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder={"Название категории"}
            />
            <PrimaryButton onClick={btnHandler}>Новая категория</PrimaryButton>
        </form>
    );
}

import React, {FC, FormEvent, useCallback, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {createCategory, fetchCategories} from "../../../store/actions/categoryAction";
import {ValidatedInput} from "../../UI/ValidatedInput/ValidatedInput";
import {PrimaryButton} from "../../UI/PrimaryButton/PrimaryButton";
import {createValidateInputValueFunc} from "../../../utils/createValidateInputValue/createValidateInputValueFunc";
import {PlusIcon} from "@heroicons/react/20/solid";


export const CategoriesForm: FC = () => {
    const [showValidation, setShowValidation] = useState(false)
    const [isValidCategoryName, setIsValidCategoryName] = useState(false)
    const [categoryName, setCategoryName] = useState("")
    const dispatch = useAppDispatch()
    const {categories} = useAppSelector(state => state.category)
    const formHandler = async (e: FormEvent) => {
        e.preventDefault()
        if (!isValidCategoryName) return setShowValidation(true)
        await dispatch(createCategory(categoryName))
        dispatch(fetchCategories())
        setCategoryName("")
        setShowValidation(false)
    }
    const validateCategoryName = useCallback(
        () =>
            createValidateInputValueFunc({
                banWords: categories.map((category) => category.name.trim()),
            }),
        [categories]
    )();
    return (
        <form className={"space-y-4 flex flex-col items-center"} onSubmit={formHandler}>
            <ValidatedInput
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                label={"Название категории"}
                showValidation={showValidation}
                setIsValid={setIsValidCategoryName}
                validateFunc={validateCategoryName}
            />
            <PrimaryButton onClick={formHandler} className={"flex items-center justify-center space-x-1"}>
                <PlusIcon className={"w-5 h-5"}/>
                <span>Новая категория</span>
            </PrimaryButton>
        </form>
    );
}

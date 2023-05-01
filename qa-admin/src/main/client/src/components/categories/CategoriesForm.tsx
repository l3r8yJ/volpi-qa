import React, {FC, FormEvent, useState} from 'react';
import {useAppDispatch} from "../../hooks/redux";
import {createCategory, fetchCategories} from "../../store/actions/categoryAction";
import {Input} from "../UI/Input/Input";
import {PrimaryButton} from "../UI/PrimaryButton/PrimaryButton";
import {createValidateInputValueFunc} from "../../utils/createValidateInputValue/createValidateInputValueFunc";

const validateInputValue = createValidateInputValueFunc()

export const CategoriesForm: FC = () => {
    const [showValidation, setShowValidation] = useState(false)
    const [isValidCategoryName, setIsValidCategoryName] = useState(false)
    const [categoryName, setCategoryName] = useState("")
    const dispatch = useAppDispatch()
    const formHandler = async (e: FormEvent) => {
        e.preventDefault()
        if (!isValidCategoryName) return setShowValidation(true)
        await dispatch(createCategory(categoryName))
        dispatch(fetchCategories())
        setCategoryName("")
        setShowValidation(false)
    }
    return (
        <form className={"space-y-4 flex flex-col items-center"} onSubmit={formHandler}>
            <Input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                label={"Название категории"}
                showValidation={showValidation}
                setIsValid={setIsValidCategoryName}
                validateFunc={validateInputValue}
            />
            <PrimaryButton onClick={formHandler}>Новая категория</PrimaryButton>
        </form>
    );
}

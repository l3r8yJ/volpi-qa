import React, {FC, FormEvent, useCallback, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {createCategory, fetchCategories} from "../../../store/actions/categoryAction";
import {PrimaryButton} from "../../UI/PrimaryButton/PrimaryButton";
import {createValidateInputValueFunc} from "../../../utils/createValidateInputValue/createValidateInputValueFunc";
import {Modal} from "../../UI/Modal";
import {ValidatedTextArea} from "../../UI/ValidatedTextArea";
import {Loader} from "../../UI/Loader";
import {LoaderSize} from "../../../utils/getLoaderSizeByName";
import {PlusIcon} from "@heroicons/react/20/solid";


export const CategoriesForm: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showValidation, setShowValidation] = useState(false)
    const [isCategoryNameValid, setIsCategoryNameValid] = useState(false)
    const [categoryName, setCategoryName] = useState("")
    const dispatch = useAppDispatch()
    const {categories, loading} = useAppSelector(state => state.category)
    const formHandler = async (e: FormEvent) => {
        e.preventDefault()
        if (!isCategoryNameValid) return setShowValidation(true)
        await dispatch(createCategory(categoryName))
        setIsModalOpen(false)
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
        <Modal
            title={"Создание категории"}
            buttonText={"Создать категорию"}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
        >
            <form onSubmit={formHandler} className={"w-full"}>
                <ValidatedTextArea
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    label={"Название категории"}
                    showValidation={showValidation}
                    setIsValid={setIsCategoryNameValid}
                    isValid={isCategoryNameValid}
                    validateFunc={validateCategoryName}
                    className={"max-h-64 min-h-[45px]"}
                />
                <div className={"w-full flex justify-end mt-6"}>
                    <PrimaryButton
                        className={"min-w-[200px]"}
                        type={"submit"}
                    >
                        {loading === "pending"
                            ? <Loader size={LoaderSize.small}/>
                            : <div className={"flex items-center justify-center gap-x-1"}>
                                <PlusIcon className={"w-5 h-5"}/>
                                <span>Создать категорию</span>
                            </div>
                        }
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}

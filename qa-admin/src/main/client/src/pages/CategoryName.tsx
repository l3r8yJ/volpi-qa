import React, {FC, FormEvent, useEffect, useState} from 'react';
import {MainLayout} from "../components/layouts/MainLayout";
import {useNavigate, useParams} from "react-router-dom";
import {QuestionsList} from "../components/questions/QuestionsList";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchQuestionsByCategory} from "../store/actions/questionAction";
import {QuestionsForm} from "../components/questions/QuestionsForm";
import {Sidebar} from "../components/Sidebar";
import {ValidatedInput} from "../components/UI/ValidatedInput/ValidatedInput";
import {createValidateInputValueFunc} from "../utils/createValidateInputValue/createValidateInputValueFunc";
import {CheckIcon, NoSymbolIcon} from "@heroicons/react/20/solid"
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {updateCategory} from "../store/actions/categoryAction";
import {clearQuestions} from "../store/reducers/questionSlice";
import {PrimaryButton} from "../components/UI/PrimaryButton/PrimaryButton";
import {SecondaryButton} from "../components/UI/SecondaryButton";
import {ICategory} from "../types/ICategory";
import {Loader} from "../components/UI/Loader";
import {LoaderSize} from "../utils/getLoaderSizeByName";
import {clearCurrentCategory} from "../store/reducers/categorySlice";

const CategoryName: FC = () => {
    const navigate = useNavigate()
    const {name} = useParams()
    const {currentCategory, loading} = useAppSelector(state => state.category)
    const [editCategoryNameMode, setEditCategoryNameMode] = useState(false)
    const [isValidCategoryName, setIsValidCategoryName] = useState(false)
    const [showValidation, setShowValidation] = useState(false)
    if (!name)
        return (
            <MainLayout>
                <div>Ошибка: категория не найдена</div>
            </MainLayout>
        )
    const [categoryName, setCategoryName] = useState(name)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchQuestionsByCategory(categoryName))
        return () => {
            dispatch(clearQuestions())
            dispatch(clearCurrentCategory())
        }
    }, [])

    const updateCategoryNameHandler = async (e: FormEvent) => {
        e.preventDefault()
        if (!isValidCategoryName) return setShowValidation(true)
        console.log(categoryName)
        const updatedCategory: ICategory = {
            ...currentCategory,
            name: categoryName
        }
        await dispatch(updateCategory(updatedCategory))
        exitEditModeHandler()
        navigate(`/categories/${categoryName}`)
    }

    const exitEditModeHandler = () => {
        setShowValidation(false)
        setEditCategoryNameMode(false)
    }

    return (
        <MainLayout>
            <div className={"flex items-end w-full py-4"}>
                <span className={"text-pale-foreground text-2xl"}>Категория:</span>
                {editCategoryNameMode
                    ? <form onSubmit={updateCategoryNameHandler}
                            className={"ml-2 flex items-center justify-center w-full gap-2"}>
                        <ValidatedInput
                            setIsValid={setIsValidCategoryName}
                            showValidation={showValidation}
                            validateFunc={createValidateInputValueFunc()}
                            value={categoryName}
                            isValid={isValidCategoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <PrimaryButton
                            variant={"safe"}
                            type={"reset"}
                            className={"flex items-center justify-center gap-1 w-auto"}
                            onClick={exitEditModeHandler}
                        >
                            <NoSymbolIcon className={"w-5 h-5"}/>
                            <span>Отменить</span>
                        </PrimaryButton>
                        <SecondaryButton
                            className={`flex items-center justify-center gap-1 w-auto ${loading === "pending" || categoryName === name ? "cursor-not-allowed" : ""}`}
                            type={"submit"}
                            disabled={loading === "pending" || categoryName === name}
                        >
                            {loading === "pending"
                                ? <Loader size={LoaderSize.small}/>
                                : <>
                                    <CheckIcon className={"w-5 h-5"}/>
                                    <span>Сохранить</span>
                                </>
                            }

                        </SecondaryButton>

                    </form>
                    : <div className={"flex items-center"}>
                        <div className={"ml-2"}>
                            <span className={"text-3xl"} style={{wordBreak: 'break-word'}}>{name}</span>
                        </div>

                        <div
                            className={"ml-2 cursor-pointer hover:text-primary-foreground/50 p-1 rounded-full duration-150"}
                            onClick={() => setEditCategoryNameMode(true)}
                        >
                            <PencilSquareIcon
                                className={"w-5 h-5"}/>
                        </div>
                    </div>
                }
            </div>
            <div className={"mt-4 flex items-start"}>
                <Sidebar><QuestionsForm categoryName={name}/></Sidebar>
                <div className={"w-full"}>
                    <QuestionsList/>
                </div>
            </div>
        </MainLayout>
    );
}

export default CategoryName

import {FC, FormEvent, useEffect, useState} from 'react';
import {MainLayout} from "../components/layouts/MainLayout";
import {useNavigate, useParams} from "react-router-dom";
import {QuestionsList} from "../components/questions/QuestionsList";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchQuestionsByCategory} from "../store/actions/questionAction";
import {QuestionsForm} from "../components/questions/QuestionsForm";
import {Sidebar} from "../components/Sidebar";
import {clearCurrentCategory} from "../store/reducers/categorySlice";
import {ValidatedInput} from "../components/UI/ValidatedInput/ValidatedInput";
import {createValidateInputValueFunc} from "../utils/createValidateInputValue/createValidateInputValueFunc";
import {CheckIcon} from "@heroicons/react/20/solid"
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {fetchCategories, updateCategory} from "../store/actions/categoryAction";
import {clearQuestions} from "../store/reducers/questionSlice";
import {PrimaryButton} from "../components/UI/PrimaryButton/PrimaryButton";

const CategoryName: FC = () => {
    const navigate = useNavigate()
    const {name} = useParams()
    const {currentCategory} = useAppSelector(state => state.category)
    const [editCategoryNameMode, setEditCategoryNameMode] = useState(false)
    const [isValidCategoryName, setIsValidCategoryName] = useState(false)
    const [showValidation, setShowValidation] = useState(false)
    const [categoryName, setCategoryName] = useState(name)
    const dispatch = useAppDispatch()
    if (!name)
        return (
            <MainLayout>
                <div>Ошибка: категория не найдена</div>
            </MainLayout>
        )
    useEffect(() => {
        dispatch(fetchQuestionsByCategory(name))
        return () => {
            dispatch(clearCurrentCategory())
            dispatch(clearQuestions())
        }
    }, [])

    const updateCategoryNameHandler = async (e: FormEvent) => {
        e.preventDefault()
        if (!isValidCategoryName || !categoryName) return setShowValidation(true)
        await dispatch(updateCategory({...currentCategory, name: categoryName}))
        dispatch(fetchCategories())
        navigate("/categories/" + categoryName)
        setShowValidation(false)
        setEditCategoryNameMode(false)
    }
    return (
        <MainLayout>
            <div className={"flex items-end w-full py-4"}>
                <span className={"text-pale text-2xl"}>Категория:</span>
                {editCategoryNameMode
                    ? <form onSubmit={updateCategoryNameHandler}
                            className={"ml-2 flex items-center justify-center w-full gap-2"}>
                        <ValidatedInput
                            setIsValid={setIsValidCategoryName}
                            showValidation={showValidation}
                            validateFunc={createValidateInputValueFunc()}
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <PrimaryButton
                            className={"flex items-center justify-center gap-1 w-auto bg-safe hover:bg-safeHov"}
                            type={"submit"}
                        >
                            <CheckIcon className={"w-5 h-5"}/>
                            <span>Сохранить</span>
                        </PrimaryButton>

                    </form>
                    : <div className={"flex items-center"}>
                        <div>
                            <span className={"ml-2 break-all text-3xl"}>{name}</span>
                        </div>

                        <div
                            className={"ml-2 cursor-pointer hover:bg-paleHov/20 p-1 rounded-full duration-150"}
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
                <div className={"flex-1"}>
                    <QuestionsList/>
                </div>
            </div>
        </MainLayout>
    );
}

export default CategoryName

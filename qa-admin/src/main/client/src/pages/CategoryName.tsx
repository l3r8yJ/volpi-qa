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
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {createCategory, fetchCategories, updateCategory} from "../store/actions/categoryAction";

const CategoryName: FC = () => {
    const navigate = useNavigate()
    const {name} = useParams()
    const {currentCategory} = useAppSelector(state => state.category)
    const [editCategoryNameMode, setEditCategoryNameMode] = useState(false)
    const [isValidCategoryName, setIsValidCategoryName] = useState(false)
    const [showValidation, setShowValidation] = useState(false)
    const [categoryName, setCategoryName] = useState(name)
    const {questions} = useAppSelector(state => state.question)
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
        }
    }, [])

    const updateCategoryNameHandler = async (e:FormEvent) => {
        e.preventDefault()
        console.log(currentCategory)
        if (!isValidCategoryName || !categoryName) return setShowValidation(true)
        await dispatch(updateCategory({...currentCategory, name: categoryName}))
        dispatch(fetchCategories())
        navigate("/categories/" + categoryName)
        setShowValidation(false)
        setEditCategoryNameMode( false)
    }
    return (
        <MainLayout>
            <div className={"flex items-center text-3xl w-full border-b border-neutral-500/50 py-4"}>
                <span className={"opacity-60"}>Категория:</span>
                {editCategoryNameMode
                    ? <form onSubmit={updateCategoryNameHandler} className={"ml-4"}>
                        <ValidatedInput
                            setIsValid={setIsValidCategoryName}
                            showValidation={showValidation}
                            validateFunc={createValidateInputValueFunc()}
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </form>
                    : < >
                        <span className={"ml-2"}>{name}</span>
                        <PencilSquareIcon className={"ml-2 w-7 h-7 cursor-pointer hover:bg-neutral-700 p-1 rounded-full duration-150"} onClick={() => setEditCategoryNameMode(true)}/>
                    </>
                }
            </div>
            {questions.length !== 0
                ? <div className={"mt-4"}>
                    <Sidebar><QuestionsForm categoryName={name}/></Sidebar>
                    <div className={"ml-64 xl:ml-72"}>
                        <QuestionsList questions={questions}/>
                    </div>
                </div>
                : <div className={"mt-4 space-y-4"}>
                    <div>В этой категории нет ещё ни одного вопроса</div>
                    <QuestionsForm categoryName={name}/>
                </div>
            }
        </MainLayout>
    );
}

export default CategoryName

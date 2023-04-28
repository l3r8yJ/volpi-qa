import React, {FC, useState} from 'react';
import {MainLayout} from "../components/layouts/MainLayout";
import {Sidebar} from "../components/Sidebar";
import {CategoriesList} from "../components/categories/CategoriesList/CategoriesList";
import {Input} from "../components/UI/Input/Input";
import {PrimaryButton} from "../components/UI/PrimaryButton/PrimaryButton";
import {useAppDispatch} from "../hooks/redux";
import {createCategory, fetchCategories} from "../store/actions/categoryAction";

const Categories: FC = () => {
    const [inputValue, setInputValue] = useState("")
    const dispatch = useAppDispatch()
    const btnHandler = async () => {
        if(inputValue){
            await dispatch(createCategory(inputValue))
            dispatch(fetchCategories())
            setInputValue("")
        }
    }
    return (
        <MainLayout>
            <Sidebar>
                <div className={"space-y-4 flex flex-col items-center"}>
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={"Название категории"}
                    />
                    <PrimaryButton onClick={btnHandler}>Новая категория</PrimaryButton>
                </div>
            </Sidebar>
            <div className={"ml-64 xl:ml-72"}>
                <CategoriesList/>
            </div>
        </MainLayout>
    );
}

export default Categories

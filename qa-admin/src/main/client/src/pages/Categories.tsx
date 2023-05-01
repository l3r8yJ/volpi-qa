import React, {FC, useState} from 'react';
import {MainLayout} from "../components/layouts/MainLayout";
import {Sidebar} from "../components/Sidebar";
import {CategoriesList} from "../components/categories/CategoriesList/CategoriesList";
import {Input} from "../components/UI/Input/Input";
import {PrimaryButton} from "../components/UI/PrimaryButton/PrimaryButton";
import {useAppDispatch} from "../hooks/redux";
import {createCategory, fetchCategories} from "../store/actions/categoryAction";
import {CategoriesForm} from "../components/categories/CategoriesForm";

const Categories: FC = () => {

    return (
        <MainLayout>
            <Sidebar>
                <CategoriesForm/>
            </Sidebar>
            <div className={"ml-64 xl:ml-72"}>
                <CategoriesList/>
            </div>
        </MainLayout>
    );
}

export default Categories

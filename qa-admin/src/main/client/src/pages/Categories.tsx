import React, {FC} from 'react';
import {MainLayout} from "../components/layouts/MainLayout";
import {Sidebar} from "../components/Sidebar";
import {CategoriesList} from "../components/categories/CategoriesList/CategoriesList";
import {CategoriesForm} from "../components/categories/CategoriesForm/CategoriesForm";

const Categories: FC = () => {

    return (
        <MainLayout>
            <div className={"flex items-start"}>
                <Sidebar>
                    <CategoriesForm/>
                </Sidebar>
                <div className={"flex-1"}>
                    <CategoriesList/>
                </div>
            </div>
        </MainLayout>
    );
}

export default Categories

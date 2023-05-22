import React, {FC} from 'react';
import {MainLayout} from "../components/layouts/MainLayout";
import {Sidebar} from "../components/Sidebar";
import {CategoriesList} from "../components/categories/CategoriesList/CategoriesList";
import {CategoriesForm} from "../components/categories/CategoriesForm/CategoriesForm";

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

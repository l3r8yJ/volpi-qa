import {FC, useEffect, useState} from 'react';
import {ChatHeader} from "./ChatHeader";
import {CategoryOption} from "./CategoryOption";
import {TextInputForm} from "./TextInputForm";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchAllCategories} from "../store/actions/categoryAction";
import {CategoryView} from "./CategoryView";
import {Layout} from "./Layout";

export const Chat: FC = () => {
    const dispatch = useAppDispatch()
    const {categories, loading} = useAppSelector(state => state.category)
    const {currentCategory} = useAppSelector(state => state.view)
    useEffect(() => {
        dispatch(fetchAllCategories())
    }, [])

    return (
        <Layout>
            {currentCategory === null
                ? <>
                    <div>
                        Здравствуйте! Я постараюсь вам помочь и найти ответы на вопросы связанные с поступлением в
                        наш Политех. <br/> Выберите категорию вопроса, который вас интересует:
                    </div>
                    <div className={"space-y-4"}>
                        {categories.map((category) => (
                            <CategoryOption key={category.id} category={category}/>
                        ))}
                    </div>
                </>
                : <CategoryView/>
            }
        </Layout>
    );
}

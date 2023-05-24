import {FC} from 'react';
import {Layout} from "./Layout";
import {DefaultView} from "./DefaultView";
import {useAppSelector} from "../hooks/redux";
import {CategoryView} from "./CategoryView";
import {QuestionView} from "./QuestionView";

export const Chat: FC = () => {
    const {currentViewName} = useAppSelector(state => state.view)
    let View: FC
    switch (currentViewName) {
        case "category":
            View = CategoryView
            break
        case "question":
            View = QuestionView
            break
        default:
            View = DefaultView
    }

    return (
        <Layout>
            <View/>
        </Layout>
    );
}

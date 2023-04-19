import {FC} from 'react';
import {MainLayout} from "../components/layouts/MainLayout";
import {useParams} from "react-router-dom";

const CategoryName: FC = () => {
    const {name} = useParams()

    return (
        <MainLayout>
            {name}
        </MainLayout>
    );
}

export default CategoryName

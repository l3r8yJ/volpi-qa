import {FC} from 'react';

export const CategoriesListHead: FC = () => {
    return (
        <div className={"flex items-center px-4 pb-2 text-pale"}>
            <div className={"w-10 text-pale border-r border-border/50"}>№</div>
            <div className={"pl-2"}>Название</div>
        </div>
    );
}

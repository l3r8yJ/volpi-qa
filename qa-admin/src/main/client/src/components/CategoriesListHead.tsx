import {FC} from 'react';

export const CategoriesListHead: FC = () => {
    return (
        <div className={"flex items-center divide-x divide-neutral-500/50 px-2 pb-2 text-neutral-400"}>
            <div className={"w-10 text-neutral-400 px-2"}>id</div>
            <div className={"px-2"}>Имя категории</div>
        </div>
    );
}

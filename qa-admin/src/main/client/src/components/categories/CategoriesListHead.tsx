import {FC} from 'react';

export const CategoriesListHead: FC = () => {
    return (
        <div className={"flex items-center px-4 pb-2 text-neutral-400"}>
            <div className={"w-10 text-neutral-400 border-r border-neutral-500/50"}>id</div>
            <div className={"pl-2"}>Поступление</div>
        </div>
    );
}

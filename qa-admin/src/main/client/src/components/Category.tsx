import {FC} from 'react';
import {ICategory} from "../types/ICategory";
import {ChevronDownIcon} from "@heroicons/react/24/outline";

export const Category: FC<ICategory> = ({id, questions, name}) => {
    return (
        <li className={"even:bg-neutral-800 flex items-center cursor-pointer p-2 hover:bg-indigo-800 rounded-lg"}>
            <div className={"w-10 px-2 text-neutral-400"}>{id}</div>
            <div className={"px-2 flex justify-between w-full"}>
                <div>{name}</div>
                <div><ChevronDownIcon className={"w-6 h-6"}/></div>
            </div>
        </li>
    );
}

import {FC} from 'react';
import {UserIcon} from "@heroicons/react/24/outline";

export const Header: FC = () => {
    return (
        <header className={" bg-neutral-900/50 py-4 "}>
            <div className={"container mx-auto flex items-center justify-between"}>
                <div className={"font-semibold text-3xl pointer-events-none"}>
                    Volpi QA admin
                </div>
                <div className={"flex space-x-1 cursor-pointer  hover:text-neutral-300 duration-100"}>
                    <span>login</span>
                    <UserIcon className="h-6 w-6" />
                </div>
            </div>
        </header>
    );
}

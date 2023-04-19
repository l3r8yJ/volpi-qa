import {FC} from 'react';
import {UserIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";

export const Header: FC = () => {
    const isMainPage = window.location.pathname === "/"
    return (
        <header className={"bg-neutral-900/50 py-4 border-b border-neutral-500/50"}>
            <div className={"mx-5 lg:container lg:mx-auto flex items-center justify-between"}>
                {isMainPage
                    ? <div className={"font-semibold text-3xl"}>
                        Volpi QA <span className={"text-indigo-600"}>admin</span>
                    </div>
                    : <Link className={"font-semibold text-3xl"} to={"/"}>
                        Volpi QA <span className={"text-indigo-600"}>admin</span>
                    </Link>

                }

                <div className={"flex space-x-1 cursor-pointer  hover:text-neutral-300 duration-100"}>
                    <span>login</span>
                    <UserIcon className="h-6 w-6"/>
                </div>
            </div>
        </header>
    );
}

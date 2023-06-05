import {FC} from 'react';
import {PowerIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../hooks/redux";
import {signOut} from "../store/reducers/authSlice";

export const Header: FC = () => {
    const dispatch = useAppDispatch()
    const signOutHandler = () => {
        dispatch(signOut())
    }
    // check to disable recursive link on main page
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

                <div
                    className={"flex gap-1 cursor-pointer hover:text-neutral-300 duration-100 items-center"}
                    onClick={signOutHandler}
                >
                    <PowerIcon className="h-5 w-5"/>
                    <span>Выйти</span>
                </div>
            </div>
        </header>
    );
}

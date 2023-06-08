import {FC} from 'react';
import {ArrowRightOnRectangleIcon} from "@heroicons/react/20/solid";
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
        <header className={"bg-secondary/50 border-b border-neutral-500/50 backdrop-blur sticky top-0 z-20 h-16 flex flex-col justify-center"}>
            <div className={"mx-5 lg:container lg:mx-auto flex items-center justify-between"}>
                {isMainPage
                    ? <div className={"font-semibold text-3xl"}>
                        Volpi QA <span className={"text-primary"}>admin</span>
                    </div>
                    : <Link className={"font-semibold text-3xl"} to={"/"}>
                        Volpi QA <span className={"text-primary"}>admin</span>
                    </Link>
                }
                <div
                    className={"flex gap-1 cursor-pointer hover:text-contrastHov duration-100 items-center"}
                    onClick={signOutHandler}
                >
                    <ArrowRightOnRectangleIcon className="h-4 w-4"/>
                    <span>Выйти</span>
                </div>
            </div>
        </header>
    );
}

import {FC, useEffect, useState} from 'react';
import {ArrowRightOnRectangleIcon} from "@heroicons/react/20/solid";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../hooks/redux";
import {signOut} from "../store/reducers/authSlice";
import {FolderIcon} from "@heroicons/react/24/outline";
import {ThemeSwitcher} from "./ThemeSwitcher";

export const Header: FC = () => {
    const dispatch = useAppDispatch()
    const signOutHandler = () => {
        dispatch(signOut())
    }
    const currentPathname = window.location.pathname

    return (
        <header
            className={"bg-primary/50 border-b border-border/50 backdrop-blur sticky top-0 z-20 h-16 flex flex-col justify-center"}>
            <div className={"mx-5 lg:container lg:mx-auto flex items-center justify-between"}>
                {currentPathname === "/"
                    ? <div className={"font-semibold text-3xl"}>
                        Volpi QA <span className={"text-accent-foreground"}>admin</span>
                    </div>
                    : <Link className={"font-semibold text-3xl"} to={"/"}>
                        Volpi QA <span className={"text-accent-foreground"}>admin</span>
                    </Link>
                }
                <div className={"flex gap-x-6"}>
                    <ThemeSwitcher/>
                    <nav className={"flex gap-x-6 items-center"}>
                        {
                            currentPathname === "/asked-questions"
                                ? <div
                                    className={"flex gap-x-1 items-center relative after:absolute after:-bottom-0.5 after:bg-pale after:block after:h-[1px] after:w-full"}>
                                    <FolderIcon className={"w-5 h-5"}/>
                                    <span>Заданные вопросы (3)</span>
                                </div>
                                : <Link to={"/unknown-questions"}
                                        className={"flex gap-x-1 items-center hover:text-primary-foreground/80 duration-150"}>
                                    <FolderIcon className={"w-5 h-5"}/>
                                    <span>Заданные вопросы (3)</span>
                                </Link>
                        }
                        <div
                            className={"flex gap-1 cursor-pointer hover:text-primary-foreground/80 duration-100 items-center"}
                            onClick={signOutHandler}
                        >
                            <ArrowRightOnRectangleIcon className="h-5 w-5"/>
                            <span>Выйти</span>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {ArrowLeftIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {setIsOpen} from "../store/reducers/modalSlice";
import {setCurrentView} from "../store/reducers/viewSlice";
import {ENROLL_TO_VPI} from "../constants/vpi";

export const ChatHeader: FC = () => {
    const {viewHeaderText, currentView} = useAppSelector(state => state.view)
    const dispatch = useAppDispatch()
    return (
        <div className={"p-4 text-xl text-white flex items-center justify-between bg-zinc-800"}>
            {currentView !== "default"
                ? <button
                    className={"text-white hover:text-neutral-300"}
                    onClick={() => dispatch(setCurrentView("default"))}
                >
                    <ArrowLeftIcon className={"w-6 h-6"}/>
                </button>
                : <div className={"w-6"}></div>
            }
            <h1>{viewHeaderText}</h1>
            <button
                className={"text-white hover:text-neutral-300"}
                onClick={() => dispatch(setIsOpen(false))}
            >
                <XMarkIcon className={"w-6 h-6"}/>
            </button>
        </div>
    );
}

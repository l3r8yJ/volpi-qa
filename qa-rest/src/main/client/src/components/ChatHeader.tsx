import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {ArrowLeftIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {setIsOpen} from "../store/reducers/modalSlice";
import {setCurrentCategory} from "../store/reducers/viewSlice";

export const ChatHeader: FC = () => {
    const {currentCategory} = useAppSelector(state => state.view)
    const dispatch = useAppDispatch()
    return (
        <div className={"p-4 text-xl text-white flex items-center justify-between bg-zinc-800"}>
            {currentCategory !== null
                ? <button
                    className={"text-white hover:text-neutral-300"}
                    onClick={() => dispatch(setCurrentCategory(null))}
                >
                    <ArrowLeftIcon className={"w-6 h-6"}/>
                </button>
                : <div className={"w-6"}></div>
            }

            {currentCategory === null
                ? <h1>Поступи в ВПИ!</h1>
                : <h1>{currentCategory.name}</h1>
            }
            <button
                className={"text-white hover:text-neutral-300"}
                onClick={() => dispatch(setIsOpen(false))}
            >
                <XMarkIcon className={"w-6 h-6"}/>
            </button>
        </div>
    );
}
